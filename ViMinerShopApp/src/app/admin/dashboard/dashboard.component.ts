import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_map from 'highcharts/modules/map';
import { throwError } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { AdminService } from 'src/app/services/admin.service';
import { AdminDashboardData, Orders } from 'src/app/store/model';
import { abbreviateNumber } from 'src/utils/converters/abbr';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { DatePipe } from '@angular/common';
import { Title } from '@angular/platform-browser';
import * as vietMap from './vietnam.json';
import proj4 from 'proj4';

HC_map(Highcharts);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  VMSDashboardChart: typeof Highcharts = Highcharts;
  odMapTable: Array<any>;
  RANGES = [[0], [1, 5], [6, 10], [11, 20], [21, 50], [50]];
  LEVEL_COLOR = ['#f7f7f7', '#d5d581', '#f4d889', '#ed9766', '#e47256', '#bd443e'];
  totalOrderSuccess = 0;

  orderType = {
    unpaid: 0,
    pending: 0,
    unshipped: 0,
    shipping: 0,
    shipped: 0,
    expired: 0
  };

  newlang: object = {
      months: [
          'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4',
          'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8',
          'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
      ],
      weekdays: [
          'Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4',
          'Thứ 5', 'Thứ 6', 'Thứ 7'
      ],
      shortMonths: [
        'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4',
        'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8',
        'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
    ],
  };

  lsoOptions: Highcharts.Options = {
    lang: this.newlang,
    title: {
      text: 'Lượt đặt hàng hằng ngày'
    },
    series: [{
      showInLegend: false,
      data: [1, 1, 1, 1, 1],
      type: 'line'
    }],
    plotOptions: {
      series: {
        dataGrouping: {
          enabled: true,
          forced: true,
          groupAll: true,
          approximation: 'sum',
          units: [
            ['day', [1]]
          ],
          dateTimeLabelFormats: {
              day: ['%A %e %b, %Y', '%A %e %b', '%A %e %b, %Y'],
          }
        }
      }
    }
  };

  maxminesPrice: Highcharts.Options = {
    lang: this.newlang,
    title: {
      text: 'Giá monero tại MaxMines'
    },
    series: [{
      showInLegend: false,
      data: [1, 1, 1, 1, 1],
      type: 'area'
    }]
  };

  cbtm: Highcharts.Options = {
    credits: {
      enabled: false
    },
    title: {
      text: 'Số đơn đặt hàng theo bản đồ Việt Nam'
    },
    xAxis: {},
    yAxis: {},
    tooltip: {
      pointFormat: '{point.name}<br />Số sản phẩm: <b>{point.productItems}</b><br />Chưa thanh toán: <b>{point.unpaid}</b><br />Đang chờ: <b>{point.pending}</b><br />Chưa giao: <b>{point.unshipped}</b><br />Đang giao: <b>{point.shipping}</b><br />Đã giao: <b>{point.shipped}</b>'
    },
    legend: {
      layout: 'horizontal',
      align: 'center'
    },
    mapNavigation: {
      enabled: true,
      buttonOptions: {
          verticalAlign: 'top'
      },
      enableButtons: true
    },
    colorAxis: {
        min: 0,
        stops: [
          [0, '#f7f7f7'],
          [0.01, '#f7a35c'],
          [1, '#d13d2a']
        ]
    },
    subtitle: {
        text: null
    },
    series: [{
      name: 'Số đơn đặt hàng',
      type: 'map',
      data: [],
      mapData: vietMap["default"]
  }]
};

  @ViewChild('reportDashboard') reportDashboard;

  dashboardData: AdminDashboardData;

  constructor(
    private adminService: AdminService,
    private datePipe: DatePipe,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.getOrderHistory();
  }

  getOrderHistory() {
    this.adminService.getOrderHistory()
      .pipe(take(1), catchError(
        error => {
          return throwError(error);
        }
      ))
      .subscribe(data => {
        this.dashboardData = data;
        this.processingOrderHistory();
    });
  }

  onMapMouseOver = (map, dataChiTiet, cb) => {
    document.getElementById('tableMap').querySelectorAll('.provinceRow').forEach((function(e) {
        if (e.getElementsByTagName('td')[0].innerHTML.trim() === map.target.name.trim()) {
          e.classList.add('active');
          document.getElementById('tableMap').scrollTop = e.getElementsByTagName('td')[0].offsetTop;
          cb(dataChiTiet.filter(tinh => tinh.diadiem === map.target.name.trim()).reverse());
        }
      }
    ));
  }

  onMapMouseOut() {
    document.getElementById('tableMap').querySelectorAll('.provinceRow').forEach((function(e) {
        e.classList.remove('active');
      }
    ));
  }

  getLevelColor(range) {
    let idx = 0;
    return range === this.RANGES[0][0] ? idx = 0
    : range > this.RANGES[1][0] - 1 && range < this.RANGES[1][1] + 1 ? idx = 1
    : range > this.RANGES[2][0] - 1 && range < this.RANGES[2][1] + 1 ? idx = 2
    : range > this.RANGES[3][0] - 1 && range < this.RANGES[3][1] + 1 ? idx = 3
    : range > this.RANGES[4][0] - 1 && range < this.RANGES[4][1] + 1 ? idx = 4
    : range > this.RANGES[5][0] && (idx = 5),
    this.LEVEL_COLOR[idx];
  }

  processingOrderHistory() {
    let tinh = null;
    const arr = [];
    const viMapChart: Object = {
      height: 800,
      proj4
    };
    const tinhThanhCN: Array<any> = [];
    this.odMapTable = [
      {
        province: 'Không xác định',
        productItems: 0,
        unpaid: 0,
        pending: 0,
        unshipped: 0,
        shipping: 0,
        shipped: 0
      }
    ];

    this.dashboardData.orderHistory.forEach(data => {
      const time = new Date(data.created_at);
      time.setUTCHours(0, 0, 0, 0);
      arr.push([time.getTime(), data.orderItems.length]);

      if (data.locationName === null) { data.locationName = 'Không xác định'; }

      if (this.odMapTable.filter(d => d.province === data.locationName).length === 0)
      {
        this.odMapTable.push({
          province: data.locationName,
          productItems: data.orderItems.length,
          unpaid: data.paymentDetail.status === 0 ? 1 : 0,
          pending: data.paymentDetail.status === 1 ? 1 : 0,
          unshipped: data.paymentDetail.status === 2 ? 1 : 0,
          shipping: data.paymentDetail.status === 3 ? 1 : 0,
          shipped: data.paymentDetail.status === 4 ? 1 : 0
        });
        if (data.locationName !== 'Không xác định')
        {
          this.totalOrderSuccess += 1;
          this.orderType[Object.keys(this.orderType)[data.paymentDetail.status]] += 1;
        }
      }
      else {
        this.odMapTable[this.odMapTable.findIndex(d => d.province === data.locationName)].productItems += data.orderItems.length,
        this.odMapTable[this.odMapTable.findIndex(d => d.province === data.locationName)].unpaid += data.paymentDetail.status === 0 ? 1 : 0,
        this.odMapTable[this.odMapTable.findIndex(d => d.province === data.locationName)].pending += data.paymentDetail.status === 1 ? 1 : 0,
        this.odMapTable[this.odMapTable.findIndex(d => d.province === data.locationName)].unshipped += data.paymentDetail.status === 2 ? 1 : 0,
        this.odMapTable[this.odMapTable.findIndex(d => d.province === data.locationName)].shipping += data.paymentDetail.status === 3 ? 1 : 0,
        this.odMapTable[this.odMapTable.findIndex(d => d.province === data.locationName)].shipped += data.paymentDetail.status === 4 ? 1 : 0;
        if (data.locationName !== 'Không xác định')
        {
          this.totalOrderSuccess += 1;
          this.orderType[Object.keys(this.orderType)[data.paymentDetail.status]] += 1;
        }
      }
    });

    this.odMapTable.forEach(data => {
      try {
        if (data.province !== 'Không xác định')
        {
          tinh = vietMap["default"].features.find(x => x.properties.name === data.province).properties['hc-key'];
          tinhThanhCN.push({
            'hc-key': tinh,
            name: tinh,
            productItems: data.productItems,
            unpaid: data.unpaid,
            pending: data.pending,
            unshipped: data.unshipped,
            shipping: data.shipping,
            shipped: data.shipped,
            color: this.getLevelColor(Number(data.productItems))
          });
        }
      } catch (e) {}
    });

    this.lsoOptions = {
      yAxis: {
          labels: {
              enabled: false
          },
          plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
          }]
      },
      xAxis: {
          title: {
              text: null
          },
          type: 'datetime',
          dateTimeLabelFormats: {
              second: '%Y-%m-%d<br/>%H:%M:%S',
              minute: '%Y-%m-%d<br/>%H:%M',
              hour: '%Y-%m-%d<br/>%H:%M',
              day: '%Y<br/>%m-%d',
              week: '%Y<br/>%m-%d',
              month: '%Y-%m',
              year: '%Y'
          },
          allowDecimals: false,
          ordinal: false
      },
      rangeSelector: {
        enabled: false
      },
      series: [
        {
          name: 'Số lượt đặt hàng',
          showInLegend: false, // disable legend
          data: arr,
          type: 'column',
          color: '#E00',
          tooltip: {
              valueDecimals: 0
          }
        },
      ],
      chart: {
        zoomType: 'x',
        marginLeft: 0,
        marginRight: 0,
        backgroundColor: null,
        height: 400,
        style: {
            fontFamily: 'arial'
        },
      },
      credits: {
          enabled: false
      },
    };

    this.cbtm = {
        chart: viMapChart,
        /*colorAxis: {
          visible: false
        },*/
        legend: {
          enabled: false,
        },
        series: [{
          point: {
            events: {
              mouseOver: e => this.onMapMouseOver(e, this.dashboardData.orderHistory, dataChange => { }),
              mouseOut: () => this.onMapMouseOut()
            }
          },
          type: 'map',
          name: 'Số đơn đặt hàng',
          dataLabels: {
            enabled: true,
            allowOverlap: true,
            inside: false,
            format: '{point.name}'
          },
          data: tinhThanhCN.filter(d => d.province !== 'Không xác định')
      }]
    };
  }

  exportReport() {
    const d = new Date();
    const variableW = (this.reportDashboard.nativeElement.offsetWidth * 0.008466666666666667) - 21;
    const width = this.reportDashboard.nativeElement.offsetWidth * 0.008466666666666667;
    const height = this.reportDashboard.nativeElement.offsetHeight * 0.008466666666666667;
    html2canvas(this.reportDashboard.nativeElement, {
      logging: true,
      allowTaint: false,
      useCORS: true
    }).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/jpeg', 1.0);
      // let pdf = new jsPDF('p', 'cm', 'a4');
      const pdf = new jsPDF('p', 'pt', [canvas.width, canvas.height]);
      pdf.text(`Báo cáo ngày ${d.toLocaleString()} của Vĩ Miner Shop`, 0, 0, {
        align: 'center'
      });
      // pdf.addImage(contentDataURL, 'PNG', 0, 0, width - variableW, height - variableW); //cm: 21.0, 29.7
      pdf.addImage(contentDataURL, 0, 0, canvas.width, canvas.height);
      pdf.save(`Báo cáo VMS ngày ${this.datePipe.transform(Date.now(), 'dd-MM-yyyy HH-mm-ss')}.pdf`);
    });
  }

  abbreviateNumber = (num: number) => abbreviateNumber(num);
}

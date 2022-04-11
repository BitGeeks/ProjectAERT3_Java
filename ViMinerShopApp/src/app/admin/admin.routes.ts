import { Routes } from '@angular/router';
import { AdGuardService } from '../services/ad-guard.service';
import { AuthGuardService } from '../services/auth-guard.service';
import { AdminComponent } from './admin.component';
import { AddAlgorithmComponent } from './algorithm-manage/add-algorithm/add-algorithm.component';
import { ManageAlgorithmComponent } from './algorithm-manage/manage-algorithm/manage-algorithm.component';
import { AddCategoryComponent } from './category-manage/add-category/add-category.component';
import { ManageCategoryComponent } from './category-manage/manage-category/manage-category.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddNewInventoryComponent } from './inventory-manage/add-new-inventory/add-new-inventory.component';
import { ManageInventoryComponent } from './inventory-manage/manage-inventory/manage-inventory.component';
import { AllComponent } from './order-manage/all/all.component';
import { AddNewProductComponent } from './product-manage/add-new-product/add-new-product.component';
import { ManageProductComponent } from './product-manage/manage-product/manage-product.component';
import { AddNewRepairSiteComponent } from './repair-site-manage/add-new-repair-site/add-new-repair-site.component';
import { ManageRepairSiteComponent } from './repair-site-manage/manage-repair-site/manage-repair-site.component';
import { RepairTicketManageComponent } from './repair-ticket-manage/repair-ticket-manage.component';
import { AddShippingMethodComponent } from './shipping-manage/add-shipping-method/add-shipping-method.component';
import { ShippingManageComponent } from './shipping-manage/shipping-manage.component';
import { AddNewHomePageSlideComponent } from './site-settings/add-new-home-page-slide/add-new-home-page-slide.component';
import { EditNotificationComponent } from './site-settings/edit-notification/edit-notification.component';
import { HomePageSlideComponent } from './site-settings/home-page-slide/home-page-slide.component';
import { TransactionManageComponent } from './transaction-manage/transaction-manage.component';
import { ManageUserComponent } from './user-manage/manage-user/manage-user.component';


export const AdminRoutes: Routes = [
  {
    path: 'admin', component: AdminComponent, canActivate: [AuthGuardService],
    children: [
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        { path: 'dashboard', component: DashboardComponent, canActivate: [AdGuardService] },
        { path: 'products', canActivate: [AdGuardService],
          children: [
            { path: '', redirectTo: 'manage', pathMatch: 'full' },
            { path: 'manage', component: ManageProductComponent, canActivate: [AdGuardService] },
            { path: 'add', component: AddNewProductComponent, canActivate: [AdGuardService] }
          ]
        },
        { path: 'inventories', canActivate: [AdGuardService],
          children: [
            { path: '', redirectTo: 'manage', pathMatch: 'full' },
            { path: 'manage', component: ManageInventoryComponent, canActivate: [AdGuardService] },
            { path: 'add', component: AddNewInventoryComponent, canActivate: [AdGuardService] }
          ]
        },
        { path: 'categories', canActivate: [AdGuardService],
          children: [
            { path: '', redirectTo: 'manage', pathMatch: 'full' },
            { path: 'manage', component: ManageCategoryComponent, canActivate: [AdGuardService] },
            { path: 'add', component: AddCategoryComponent, canActivate: [AdGuardService] }
          ]
        },
        { path: 'algorithms', canActivate: [AdGuardService],
          children: [
            { path: '', redirectTo: 'manage', pathMatch: 'full' },
            { path: 'manage', component: ManageAlgorithmComponent, canActivate: [AdGuardService] },
            { path: 'add', component: AddAlgorithmComponent, canActivate: [AdGuardService] }
          ]
        },
        { path: 'orders', canActivate: [AdGuardService],
          children: [
            { path: '', redirectTo: 'all', pathMatch: 'full' },
            { path: 'all', component: AllComponent, canActivate: [AdGuardService] }
          ]
        },
        { path: 'transactions', component: TransactionManageComponent, canActivate: [AdGuardService] },
        { path: 'repairs', component: RepairTicketManageComponent, canActivate: [AdGuardService] },
        { path: 'shipping', canActivate: [AdGuardService],
          children: [
            { path: '', redirectTo: 'manage', pathMatch: 'full' },
            { path: 'manage', component: ShippingManageComponent, canActivate: [AdGuardService] },
            { path: 'add', component: AddShippingMethodComponent, canActivate: [AdGuardService] }
          ]
        },
        { path: 'repairSites', canActivate: [AdGuardService],
          children: [
            { path: '', redirectTo: 'manage', pathMatch: 'full' },
            { path: 'manage', component: ManageRepairSiteComponent, canActivate: [AdGuardService] },
            { path: 'add', component: AddNewRepairSiteComponent, canActivate: [AdGuardService] }
          ]
        },
        { path: 'users', canActivate: [AdGuardService],
          children: [
            { path: '', redirectTo: 'manage', pathMatch: 'full' },
            { path: 'manage', component: ManageUserComponent, canActivate: [AdGuardService] },
            { path: 'add', component: AddShippingMethodComponent, canActivate: [AdGuardService] }
          ]
        },
        { path: 'settings', canActivate: [AdGuardService],
          children: [
            { path: '', redirectTo: 'slider', pathMatch: 'full' },
            { path: 'slider', component: HomePageSlideComponent, canActivate: [AdGuardService] },
            { path: 'addSlider', component: AddNewHomePageSlideComponent, canActivate: [AdGuardService] },
            { path: 'editNotification', component: EditNotificationComponent, canActivate: [AdGuardService] }
          ]
        },
    ]
  }
];

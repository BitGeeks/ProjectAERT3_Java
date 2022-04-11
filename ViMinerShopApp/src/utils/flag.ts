const FLAG_FEATURE_ORDER = 'FLAG_FEATURE_ORDER';
const FLAG_SPOT_ORDER = 'FLAG_SPOT_ORDER';

export function convertFlag(flag: string): string {
    switch (flag) {
        case FLAG_FEATURE_ORDER:
            return 'Đặt trước';
        case FLAG_SPOT_ORDER:
            return 'Giao ngay';
        default:
            return null;
    }
}

import { Tabs } from "../interface/common";

export const settingTabs: Tabs[] = [
    {
        id: 1,
        title: 'General',
        value: 'general',
        icon: 'general-setting',
    },
    {
        id: 2,
        title: 'Activation',
        value: 'activation',
        icon: 'activation-setting',
    },
    {
        id: 3,
        title: 'Wallet Points',
        value: 'wallet-points',
        icon: 'wallet-point',
    },
    {
        id: 4,
        title: 'Seller Commissions',
        value: 'seller-commissions',
        icon: 'seller-commission',
    },
    {
        id: 5,
        title: 'Refund',
        value: 'refund',
        icon: 'setting-refund',
    },
    {
        id: 6,
        title: 'Delivery',
        value: 'delivery',
        icon: 'complete-deliver',
    },
    {
        id: 7,
        title: 'Payment Method',
        value: 'payment-method',
        icon: 'setting-payment',
    },
    {
        id: 8,
        title: 'Analytics',
        value: 'analytics',
        icon: 'setting-analytics',
    }
]

export const paymentTabs: Tabs[] = [
    {
        id: 1,
        title: 'Paypal',
        value: 'paypal',
    },
    {
        id: 2,
        title: 'Razorpay',
        value: 'razorpay',
    },
    {
        id: 3,
        title: 'Mollie',
        value: 'mollie',
    },
    {
        id: 4,
        title: 'COD',
        value: 'cod',
    },
    {
        id: 4,
        title: 'Stripe',
        value: 'stripe',
    },
]

export const analyticTabs: Tabs[] = [
    {
        id: 1,
        title: 'Facebook Pixel',
        value: 'facebook-pixel',
    },
    {
        id: 2,
        title: 'Google Analytics',
        value: 'google-analytics',
    },
]
import { Select2Data } from "ng-select2-component";
import { CartInfo, NetBanking, NumberingWizardTabs, ProductDetails, ProductTotal, ShippingForm, VerticalValidation } from "../interface/form-layout";

export const numberingWizardTabs: NumberingWizardTabs[] = [
  {
    id: 1,
    title: 'Basic Info',
    value: 'basic info',
    class: 'one stepper step editing'
  },
  {
    id: 2,
    title: 'Cart Info',
    value: 'cart info',
    class: 'two step'
  },
  {
    id: 3,
    title: 'Feedback',
    value: 'feedback',
    class: 'three step'
  },
  {
    id: 4,
    title: 'Finish',
    value: 'finish',
    class: 'four step'
  }
]

export const selectState: Select2Data = [
  {
    label: 'U.K',
    value: 'U.K'
  },
  {
    label: 'U.s',
    value: 'U.s'
  },
  {
    label: 'India',
    value: 'India'
  },
]

export const selectPosition: Select2Data = [
  {
    label: 'Web Designer',
    value: 'Web Designer'
  },
  {
    label: 'Software Engineer',
    value: 'Software Engineer'
  },
  {
    label: 'UI/UX Designer',
    value: 'UI/UX Designer'
  },
  {
    label: 'Web Developer',
    value: 'Web Developer'
  },
]

export const verticalValidation: VerticalValidation[] = [
  {
    id: 1,
    title: 'Your Info',
    value: 'your info',
    text: 'Add your details',
    class: 'user'
  },
  {
    id: 2,
    title: 'Cart Info',
    value: 'cart info',
    text: 'Add your a/c details',
    class: 'link'
  },
  {
    id: 3,
    title: 'Net Banking',
    value: 'net banking',
    text: 'Choose your bank',
    class: 'user-group'
  },
]

export const cartInfo: CartInfo[] = [
  {
    id: 'flexRadioDefault1',
    checked: false,
    title: 'Visa'
  },
  {
    id: 'flexRadioDefault2',
    checked: false,
    title: 'MasterCard'
  },
  {
    id: 'flexRadioDefault3',
    checked: true,
    title: 'Paypal'
  },
]

export const netBanking: NetBanking[] = [
  {
    row: 1,
    details: [
      {
        id: 'flexRadioDefault-z',
        checked: false,
        title: 'Industrial & Commercial Bank'
      },
      {
        id: 'flexRadioDefault-y',
        checked: false,
        title: 'Agricultural Bank'
      },
      {
        id: 'lexRadioDefault-x',
        checked: true,
        title: 'JPMorgan Chase & Co.'
      },
    ],
  },
  {
    row: 2,
    details: [
      {
        id: 'flexRadioDefault-w',
        checked: false,
        title: 'Construction Bank Corp.'
      },
      {
        id: 'flexRadioDefault-v',
        checked: false,
        title: 'Bank of America'
      },
      {
        id: 'lexRadioDefault-u',
        checked: false,
        title: 'HDFC Bank'
      },
    ]
  }

]

export const shippingForm: ShippingForm[] = [
  {
    id: 1,
    title: 'Billing',
    value: 'billing',
    icon: 'user'
  },
  {
    id: 2,
    title: 'Shipping',
    value: 'shipping',
    icon: 'truck'
  },
  {
    id: 3,
    title: 'Payment',
    value: 'payment',
    icon: 'money-bill-1'
  },
  {
    id: 4,
    title: 'Finish',
    value: 'finish',
    icon: 'check-square'
  }
]

export const productDetails: ProductDetails[] = [
  {
    image: 'assets/images/product/13.png',
    alt: 't-shirt',
    title: 'T-shirt',
    quantity: '98 * 2',
    price: 400
  },
  {
    image: 'assets/images/email-template/4.png',
    alt: 'headphone',
    title: 'Headphone',
    quantity: '4*2',
    price: 450
  },
  {
    image: 'assets/images/product/2.png',
    alt: 't-shirt',
    title: 'T-shirt',
    quantity: '10 * 2',
    price: 234
  },
  {
    image: 'assets/images/dashboard-2/product/2.png',
    alt: 't-shirt',
    title: 'Chairs',
    quantity: '98 * 2',
    price: 200
  }
]

export const productTotal: ProductTotal[] = [
  {
    title: 'Subtotal',
    price: '1284.00'
  },
  {
    title: 'Discount',
    price: '20.00'
  },
  {
    title: 'Shipping Charge :',
    price: '100.78'
  },
  {
    title: 'Tax',
    price: '205.34',
  },
  {
    title: 'Total (USD) :',
    price: '1569.79',
  }
]

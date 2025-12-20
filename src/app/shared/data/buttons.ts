export const flatButton = [
  {
    title: "Primary",
    class: "primary text-white"
  },
  {
    title: "Secondary",
    class: "secondary text-white"
  },
  {
    title: "Success",
    class: "success text-white"
  },
  {
    title: "Info",
    class: "info text-white"
  },
  {
    title: "Warning",
    class: "warning text-white"
  },
  {
    title: "Danger",
    class: "danger text-white"
  },
  {
    title: "Light",
    class: "light"
  }
];


export const buttonSize = [
  {
    class: 'primary btn-lg rounded-es-lg',
    title: 'Large'
  },
  {
    class: 'secondary rounded-es-lg',
    title: 'Default'
  },
  {
    class: 'warning btn-sm rounded-es-lg',
    title: 'Small'
  },
  {
    class: 'success btn-xs rounded-es-md',
    title: 'Extra small'
  }
]

export const roundedButton = [
  {
    class: 'primary',
    title: 'Contacts'
  },
  {
    class: 'dark',
    title: 'Users'
  },
  {
    class: 'success',
    title: 'Chats'
  },
  {
    class: 'info',
    title: 'Animation'
  },
  {
    class: 'warning',
    title: 'Widgets'
  },
  {
    class: 'danger',
    title: 'Project'
  },
  {
    class: 'light',
    title: 'Icons'
  },
]

export const roundedSize = [
  {
    class: 'primary text-white btn-lg',
    name: 'Large'
  },
  {
    class: 'secondary text-white',
    name: 'Default'
  },
  {
    class: 'warning btn-sm',
    name: 'Small'
  },
  {
    class: 'success btn-xs text-white',
    name: 'Extra small'
  },
]

export const disableButton = [
  {
    class: 'primary text-white',
    name: "I'm disabled"
  },
  {
    class: 'pill btn-warning',
    name: 'Having problems'
  },
  {
    class: 'outline-primary',
    name: 'Inaccessible'
  },
  {
    class: 'pill btn-outline-warning',
    name: 'Disabled'
  },
]

export const iconsButton = [
  {
    class: 'btn b-ln-height btn-primary btn-square text-white',
    icon: 'help-circle'
  },
  {
    class: 'btn b-ln-height btn-secondary btn-square text-white',
    icon: 'clock'
  },
  {
    class: 'btn b-ln-height btn-warning',
    icon: 'loader'
  },
  {
    class: 'btn b-ln-height button-light-primary',
    icon: 'radio'
  },
  {
    class: 'btn-pill button-light-secondary',
    icon: 'loader'
  },
  {
    class: 'btn-pill button-light-warning',
    icon: 'radio'
  },
  {
    class: 'btn b-ln-height border btn-outline-primary',
    icon: 'radio'
  },
  {
    class: 'btn-pill btn-outline-secondary border-secondary !border',
    icon: 'loader'
  },
  {
    class: 'btn-pill btn-outline-warning border-warning !border',
    icon: 'radio'
  },
]

export const iconTitle = [
  {
    class: 'btn b-ln-height btn-secondary text-white btn-square',
    icon: 'clock',
    title: 'Secondary'
  },
  {
    class: 'btn b-ln-height btn-warning',
    icon: 'alert-triangle',
    title: 'Warning'
  },
  {
    class: 'btn-pill button-light-success',
    icon: 'check-square',
    title: 'Success'
  },
  {
    class: 'btn b-ln-height border-info border btn-outline-info',
    icon: 'volume-1',
    title: 'Info'
  },
  {
    class: 'btn-pill btn-outline-primary border border-primary',
    icon: 'loader',
    title: 'Primary'
  },
]

export const dashedBorder = ["Primary", "Secondary", "Success", "Info", "Warning", "Danger", "Dark"]

export const loaderButton = [
  {
    class: 'primary',
    title: 'Initiating Connection...',
    icon: 'circle-notch fa-spin'
  },
  {
    class: 'secondary',
    title: 'Spooling Data...',
    icon: 'arrows-rotate fa-spin'
  },
  {
    class: 'success',
    title: 'Compiling Request...',
    icon: 'spinner fa-spin-pulse'
  },
]

export interface ButtonGroup {
  title: string;
  class: string;
  sub_class?: string;
  button_groups: ButtonGroupItem[];
}

export interface ButtonGroupItem {
  class?: string;
  buttons: ButtonItem[];
}

export interface ButtonItem {
  label?: string;
  icon?: string;
  class?: string;
}

export const buttonGroups: ButtonGroup[] = [
  {
    title: "Button Group Variation",
    class: 'col-span-4 xl:col-span-6 md:col-span-12 box-col-6',
    sub_class: 'button-variation',
    button_groups: [
      {
        class: 'btn-group-square',
        buttons: [
          { label: "Left", class: "btn-primary text-white" },
          { label: "Middle", class: "button-light-primary" },
          { label: "Right", class: "btn-primary text-white" }
        ]
      },
      {
        class: "btn-group-pill",
        buttons: [
          { label: "Left", class: "button-light-primary" },
          { label: "Middle", class: "btn-primary text-white !rounded-none" },
          { label: "Right", class: "button-light-primary" }
        ]
      },
      {
        buttons: [
          { label: "Left", class: "btn-primary text-white !rounded-l-lg !rounded-r-none" },
          { label: "Middle", class: "button-light-primary !rounded-none !border-x-0" },
          { label: "Right", class: "btn-primary text-white !rounded-r-lg !rounded-l-none" }
        ]
      }
    ]
  },
  {
    title: "Outline Button Group",
    class: 'col-span-4 xl:col-span-6 md:col-span-12 box-col-6',
    sub_class: 'button-outlined',
    button_groups: [
      {
        class: "btn-group-square",
        buttons: [
          { icon: "arrow-left", class: "btn-outline-primary" },
          { icon: "arrow-up", class: "btn-outline-primary !rounded-none !border-x-0" },
          { icon: "arrow-right", class: "btn-outline-primary" }
        ]
      },
      {
        class: "btn-group-pill",
        buttons: [
          { icon: "arrow-left-circle", class: "btn-outline-primary" },
          { icon: "arrow-up-circle", class: "btn-outline-primary !rounded-none !border-x-0" },
          { icon: "arrow-right-circle", class: "btn-outline-primary" }
        ]
      },
      {
        buttons: [
          { icon: "align-left", class: "btn-outline-primary !rounded-l-lg !rounded-r-none" },
          { icon: "align-center", class: "btn-outline-primary !rounded-none !border-x-0" },
          { icon: "align-right", class: "btn-outline-primary !rounded-r-lg !rounded-l-none" }
        ]
      }
    ]
  },
  {
    title: "Button Group Sizes",
    class: 'col-span-4 xxl:col-span-12 box-col-12',
    button_groups: [
      {
        buttons: [
          { label: "Left", class: "btn-outline-primary border btn-lg !rounded-l-lg !rounded-r-none" },
          { label: "Middle", class: "btn-outline-primary border btn-lg btn-lg !rounded-none !border-x-0" },
          { label: "Right", class: "btn-outline-primary border btn-lg !rounded-r-lg !rounded-l-none" }
        ]
      },
      {
        buttons: [
          { label: "Left", class: "btn-outline-primary border !rounded-l-lg !rounded-r-none" },
          { label: "Middle", class: "btn-outline-primary border !rounded-none !border-x-0" },
          { label: "Right", class: "btn-outline-primary border !rounded-r-lg !rounded-l-none" }
        ]
      },
      {
        buttons: [
          { label: "Left", class: "btn-outline-primary border btn-sm !rounded-l-lg !rounded-r-none" },
          { label: "Middle", class: "btn-outline-primary border btn-sm !rounded-none !border-x-0" },
          { label: "Right", class: "btn-outline-primary border btn-sm !rounded-r-lg !rounded-l-none" }
        ]
      }
    ]
  }
];

export interface BlockButton {
  title: string;
  class:string;
  buttons: Buttons[]
}

export interface Buttons {
  class: string;
  text: string;
  btn_class?: boolean;
}

export const blockButton: BlockButton[] = [
  {
    title: "Block Button",
    class: 'grid',
    buttons: [
      {
        class: "btn button-light-primary",
        text: "Click here, there is a big surprise with you, Hurry Up!!",
      },
      {
        class: "btn btn-primary text-white",
        text: "40% off all B-Stock Sale!! Hurry Up!!",
      }
    ]
  },
  {
    title: "Button Center",
    class: 'grid grid-cols-12',
    buttons: [
      {
        class: "btn w-full button-light-primary mb-4",
        text: "Center Button",
        btn_class: true,
      },
      {
        class: "btn w-full btn-primary text-white",
        text: "Center Button",
        btn_class: true,
      }
    ]
  },
  {
    title: "Button End",
    class: 'md:block flex justify-end',
    buttons: [
      {
        class: "btn button-light-primary mr-2",
        text: "Cancel",
      },
      {
        class: "btn btn-primary text-white",
        text: "Submit",
      }
    ]
  }
];

export const verticalVariationColor = ["Primary", "Secondary", "Success", "Danger", "Warning"]

export const verticalVariationRadio = [
  {
    id: 'vbtn-radio1',
    title: 'Radio 1',
    checked: true
  },
  {
    id: 'vbtn-radio2',
    title: 'Radio 2',
    checked: false
  },
  {
    id: 'vbtn-radio3',
    title: 'Radio 3',
    checked: false
  }
]

export const horizontalVariationCheckbox = [
  {
    id: 'btncheck1',
    title: 'Checkbox 1',
    class: 'success !rounded-r-none'
  },
  {
    id: 'btncheck2',
    title: 'Checkbox 2',
    class: 'primary !border-x-0 !rounded-none'
  },
  {
    id: 'btncheck3',
    title: 'Checkbox 3',
    class: 'success !rounded-l-none'
  }
]

export const boldBorder = [
  {
    class: 'primary-2x',
    title: 'Animation'
  },
  {
    class: 'secondary-2x',
    title: 'Icons'
  },
  {
    class: 'success-2x',
    title: 'Blog'
  },
  {
    class: 'info-2x',
    title: 'Widgets'
  },
  {
    class: 'warning-2x',
    title: 'Chat'
  },
  {
    class: 'danger-2x',
    title: 'Users'
  },
  {
    class: 'light-2x txt-dark',
    title: 'FAQ'
  },
]

export const radioButton = [
  {
    id: 'radio7',
    title: 'Theme',
    checked: false
  },
  {
    id: 'radio8',
    title: 'E-commerce',
    checked: true
  }
]

export const checkboxButton = [
  {
    id: 'checkbox-primary-1',
    title: 'Theme',
  },
  {
    id: 'checkbox-primary-2',
    title: 'E-commerce',
  }
]

export const radialButton = [
  {
    title: 'Default Gradient Buttons',
    class: 'col-span-4 xl:col-span-6 sm:col-span-12 col-xl-4 col-sm-6',
    details: [
      { text: "Icons", class: "btn btn-primary-gradien" },
      { text: "Animation", class: "btn btn-secondary-gradien" },
      { text: "Tasks", class: "btn btn-success-gradien" },
      { text: "Letter box", class: "btn btn-info-gradien" },
      { text: "Chat", class: "btn btn-warning-gradien" },
      { text: "Blog", class: "btn btn-danger-gradien" },
      { text: "Gallery", class: "btn btn-light-gradien text-dark" }
    ],
  },
  {
    title: 'Flat Gradient Buttons',
    class: 'col-span-4 xl:col-span-6 sm:col-span-12 col-xl-4 col-sm-6',
    details: [
      { text: "Icons", class: "btn btn-square btn-primary-gradien" },
      { text: "Animation", class: "btn btn-square btn-secondary-gradien" },
      { text: "Tasks", class: "btn btn-square btn-success-gradien" },
      { text: "Letter box", class: "btn btn-square btn-info-gradien" },
      { text: "Chat", class: "btn btn-square btn-warning-gradien" },
      { text: "Blog", class: "btn btn-square btn-danger-gradien" },
      { text: "Gallery", class: "btn btn-square btn-light-gradien text-dark" }
    ],
  },
  {
    title: 'Rounded Gradient Buttons',
    class: 'col-span-4 xl:col-span-12 col-xl-4 col-sm-12',
    details: [
      { text: "Icons", class: "btn btn-pill btn-air-primary btn-primary-gradien" },
      { text: "Animation", class: "btn btn-pill btn-air-secondary btn-secondary-gradien" },
      { text: "Tasks", class: "btn btn-pill btn-air-success btn-success-gradien" },
      { text: "Letter box", class: "btn btn-pill btn-air-info btn-info-gradien" },
      { text: "Chat", class: "btn btn-pill btn-air-warning btn-warning-gradien" },
      { text: "Blog", class: "btn btn-pill btn-air-danger btn-danger-gradien" },
      { text: "Gallery", class: "btn btn-pill btn-air-light btn-light-gradien txt-dark" }
    ]
  }
]

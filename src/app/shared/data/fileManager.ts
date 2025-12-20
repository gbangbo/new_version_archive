import { FileManager, FileTypes, PricingPlan } from "../interface/fileManager";

export const fileTypes: FileTypes[] = [
  {
    name: "Folders",
    total_files: 124,
    size: "45 MB",
    icon: 'folder-structure'
  },
  {
    name: "Documents",
    total_files: 23,
    size: "34 MB",
    icon: 'doc-file'
  },
  {
    name: "Images",
    total_files: 34,
    size: "78 MB",
    icon: 'image-file'
  },
  {
    name: "PDF",
    total_files: 10,
    size: "56 MB",
    icon: 'pdf-file'
  },
  {
    name: "XML",
    total_files: 18,
    size: "23 MB",
    icon: 'xml-file'
  },
  {
    name: "SQL",
    total_files: 20,
    size: "45 MB",
    icon: 'sql-file'
  },
  {
    name: "Audio",
    total_files: 23,
    size: "56 MB",
    icon: 'sql-file'
  },
  {
    name: "Video",
    total_files: 2,
    size: "23 MB",
    icon: 'sql-file'
  }
]

export const pricingPlan: PricingPlan[] = [
  {
    name: "Trial Version",
    price: "FREE",
    storage: "100 GB Space",
    status: "Selected",
    image: 'assets/images/dashboard/folder.png'
  },
  {
    name: "Premium",
    price: "$5/month",
    storage: "250 GB Space",
    status: "Contact Us",
    image: 'assets/images/dashboard/folder1.png'
  }
]

export const fileManager: FileManager[] = [
  {
    name: "Test folder",
    type: 'folder'
  },
  {
    name: "index.html",
    type: 'file',
    text: 'HTML'
  },
  {
    name: "Folder A",
    type: 'folder'
  },
  {
    name: "index.php",
    type: 'file',
    text: 'PHP'
  },
  {
    name: "Textfile.txt",
    type: 'file',
    text: 'TXT'
  },
  {
    name: "Changelog.exe",
    type: 'file',
    text: '.?'
  },
  {
    name: "Folder B",
    type: 'folder'
  },
  {
    name: "Mofi.html",
    type: 'file',
    text: 'HTML'
  },
  {
    name: "Logo.psd",
    type: 'file',
    text: '.?'
  },
  {
    name: "Images",
    type: 'folder'
  },
  {
    name: "Applications",
    type: 'folder'
  },
  {
    name: "Project.zip",
    type: 'file',
    text: 'ZIP'
  },
  {
    name: "essay.txt",
    type: 'file',
    text: 'TXT'
  },
  {
    name: "Start-up",
    type: 'folder'

  },
  {
    name: "file.unknown",
    type: 'file',
    text: '.?'
  },
  {
    name: "timer.svg",
    type: 'file',
    text: 'SVG'
  },
  {
    name: "Resumes",
    type: 'folder'

  },
  {
    name: "Demo_files",
    type: 'folder'

  },

  {
    name: ".net_pra",
    type: 'folder'

  },
  {
    name: "audiobook.m4b",
    type: 'file',
    text: '.?'
  },
  {
    name: "Portfolio",
    type: 'folder'

  },
  {
    name: "song.m4v",
    type: 'file',
    text: '.?'
  },
  {
    name: "product_list.xml",
    type: 'file',
    text: '.?'
  },
  {
    name: "birds_sound.aiff",
    type: 'file',
    text: '.?'
  },
  {
    name: "Themes",
    type: 'folder'
  },
  {
    name: "presentation.wmv",
    type: 'file',
    text: '.?'
  },
  {
    name: "conference.mp4",
    type: 'file',
    text: '.?'
  },
];
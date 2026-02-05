import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OwlDateTimeComponent, OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

import { PaginationComponent } from '../pagination/pagination.component';
import { SvgIconComponent } from "../svg-icon/svg-icon.component";
import { TooltipComponent } from "../tooltip/tooltip.component";
import { PageSizeOptions, Pagination, TableClickedAction, TableConfigs, TableRows } from '../../../interface/common';
import { TableService } from '../../../services/table.service';

@Component({
  selector: 'app-table',
  imports: [CommonModule, FormsModule, RouterModule,
            OwlDateTimeModule, OwlNativeDateTimeModule, PaginationComponent,
            SvgIconComponent, TooltipComponent],
  providers: [DecimalPipe],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  @ViewChild('dateSelection', { static: false }) dateSelection!: OwlDateTimeComponent<any>;

  @Input() tableConfig: TableConfigs;
  @Input() hasCheckbox: boolean;
  @Input() pageSize: number = 4;
  @Input() paginateDetails: boolean = false;
  @Input() showPaginate: boolean = false;
  @Input() tableClass: string;
  @Input() search: boolean = true;
  @Input() searchLibelle: string = 'Search:';
  @Input() pagination: boolean = true;
  @Input() selectedRows: boolean = false;
  @Input() rowDetails: boolean = false;
  @Input() dateFilter: boolean = false;
  @Input() downloadReports: boolean = false;
  @Input() searchPlaceholder: string = '';
  @Input() emptyTexte: string = 'No data found';
  @Input() entriesLabel = 'Affichage de {start} à {end} sur {total} éléments';
  // ✅ NOUVEAUX INPUTS pour personnaliser les boutons
  @Input() showCopyButton: boolean = true;
  @Input() showCSVButton: boolean = true;
  @Input() showExcelButton: boolean = true;
  @Input() showPDFButton: boolean = true;
  @Input() showPrintButton: boolean = true;

  // ===== LABELS DES BOUTONS =====
  @Input() copyButtonLabel: string = 'Copy';
  @Input() csvButtonLabel: string = 'CSV';
  @Input() excelButtonLabel: string = 'Excel';
  @Input() pdfButtonLabel: string = 'PDF';
  @Input() printButtonLabel: string = 'Print';

  // ===== CLASSES CSS PERSONNALISÉES =====
  @Input() copyButtonClass: string = 'dt-button buttons-copy buttons-html5 btn-outline-primary';
  @Input() csvButtonClass: string = 'dt-button buttons-csv buttons-html5 btn-outline-primary';
  @Input() excelButtonClass: string = 'dt-button buttons-excel buttons-html5 btn-outline-primary';
  @Input() pdfButtonClass: string = 'dt-button buttons-pdf buttons-html5 btn-outline-primary';
  @Input() printButtonClass: string = 'dt-button buttons-print btn-outline-primary';

  // ===== ICÔNES DES BOUTONS =====
  @Input() copyButtonIcon: string = 'ti ti-copy';
  @Input() csvButtonIcon: string = 'ti ti-file-csv';
  @Input() excelButtonIcon: string = 'ti ti-file-spreadsheet';
  @Input() pdfButtonIcon: string = 'ti ti-file-pdf';
  @Input() printButtonIcon: string = 'ti ti-printer';

  // ===== TOOLTIPS =====
  @Input() copyButtonTooltip: string = 'Copier dans le presse-papier';
  @Input() csvButtonTooltip: string = 'Exporter en CSV';
  @Input() excelButtonTooltip: string = 'Exporter en Excel';
  @Input() pdfButtonTooltip: string = 'Exporter en PDF';
  @Input() printButtonTooltip: string = 'Imprimer';
  @Input() libBtnAction: string = 'Oui, Supprimer';

  // ===== ÉVÉNEMENTS =====
  @Output() onExport = new EventEmitter<{ type: string, data: any[] }>();
  @Output() onCopy = new EventEmitter<any[]>();
  @Output() onCSV = new EventEmitter<any[]>();
  @Output() onExcel = new EventEmitter<any[]>();
  @Output() onPDF = new EventEmitter<any[]>();
  @Output() onPrint = new EventEmitter<any[]>();


  @Output() action = new EventEmitter<TableClickedAction>();



  public tableData$: Observable<any>;
  public total$: Observable<number>;
  public selected: number[] = [];
  public paginate: Pagination; // Pagination use only
  public tableData: any;
  public pageNo: number = 1
  public sortValue: string = 'asc';
  public sortable_key: string;
  public searchText: string = '';
  public rowDetailOpen: boolean = false;
  public selectedOpenRows: number[] = [];
  public dateDropdownOpen: boolean = false;
  public customDate = [];
  
  public filter = {
    search: '',
    sort: 'asc',
    page: this.pageNo,
    pageSize: this.pageSize,
    date: {
      start_date: '',
      to_date: ''
    }
  }

  public pageSizeOptions: PageSizeOptions[] = [
    { title: 10, value: 10 },
    { title: 15, value: 15 },
    { title: 25, value: 25 },
    { title: 50, value: 50 },
    { title: 100, value: 100 }
  ]

  constructor(public tableService: TableService) {}

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['pageSize']) {
      this.filter['pageSize'] = changes['pageSize'].currentValue;

      if (!this.pageSizeOptions.some(option => option.value === this.filter['pageSize'])) {
        const index = this.pageSizeOptions.findIndex(option => option.value > this.filter['pageSize']);
    
        const newOption = { title: this.filter['pageSize'], value: this.filter['pageSize'] , selected: true };
    
        if (index === -1) {
          this.pageSizeOptions.push(newOption);
        } else {
          this.pageSizeOptions.splice(index, 0, newOption);
        }
      }
    }

    if (changes['tableConfig'] && this.tableConfig && this.tableConfig.data) {
      this.paginateData();
    }

    if (changes['pageNo']) {
      this.paginateData();
    }
  }

  isArray(value: any): boolean {
    return Array.isArray(value);
  }

  getNestedPropertyValue(dataField: string | undefined, columnData: any): string {
    if (!dataField) {
      return '';
    }

    let keys = dataField.split('.');
    let value = columnData;

    for (let key of keys) {
      if (value && value.hasOwnProperty(key)) {
        value = value[key];
      } else {
        return '';
      }
    }

    return value;
  }

  getColumnClass(template: string, details: any) {
    for(let key in details) {
      if(template.includes(key)) {
        const value = details[key];
          template = template.replace(key, value);
      }
    }
    return template
  }

  checkUncheckAll(event: Event) {
    this.tableConfig.data.forEach((item: any) => {
      item.is_checked = (<HTMLInputElement>event?.target)?.checked;
      this.setSelectedItem((<HTMLInputElement>event?.target)?.checked, item?.id);
    });
  }

  onItemChecked(event: Event) {
    this.setSelectedItem((<HTMLInputElement>event.target)?.checked, Number((<HTMLInputElement>event.target)?.value));
  }

  setSelectedItem(checked: Boolean, value: Number) {
    const index = this.selected.indexOf(Number(value));
    if (checked) {
      if (index == -1) this.selected.push(Number(value));
    } else {
      this.selected = this.selected.filter(id => id !== Number(value));
    }
  }

  onSort(field: string) {
    this.sortable_key = field;
    this.filter['page'] = 1;
    this.filter['sort'] == 'asc' ? this.filter['sort'] = 'desc' : this.filter['sort'] = 'asc';
    this.applyFilters();
  }

  paginateData() {
    if (this.tableConfig && this.tableConfig.data) {
      this.applyFilters();
    }
  }

  setPage(data: number) {
    this.filter['page'] = data;
    this.paginateData();
  }

  searchTerm(value: string) {
    this.filter['page'] = 1;
    this.filter['search'] = value;
    this.applyFilters();
  }

  handleSelect(event: any) {
    this.filter['pageSize'] = +event.target.value;
    this.applyFilters();
  }

  handleAction(value: TableRows, details: any) {
    if(value.action_to_perform == 'delete') {
      if(!value.modal) {
        this.action.emit({action_to_perform: value.action_to_perform, data: details})
      } else {
        Swal.fire({
          title: 'Êtes vous sûr ?',
          text: value.model_text ? value.model_text : 'Voulez-vous vraiment supprimer le produit?',
          imageUrl: 'assets/images/gif/trash.gif',
          confirmButtonText: this.libBtnAction,
          showCancelButton: true,
          cancelButtonText: 'Annuler',
          cancelButtonColor: '#FC4438'
        }).then((result) => {
          if(result.isConfirmed) {
            this.action.emit({action_to_perform: value.action_to_perform, data: details})
          }
        })
      }
    }
    if(value.action_to_perform == 'view') {
      this.action.emit({action_to_perform: value.action_to_perform, data: details})
    }
  }

  openRowDetails(id: number) {
    const index = this.selectedOpenRows.indexOf(id);

    if (index === -1) {
      this.selectedOpenRows.push(id);
    } else {
      this.selectedOpenRows = this.selectedOpenRows.filter(rowId => rowId !== id);
    }
  }

  getColSpan() {
    const columnLength = this.tableConfig.columns.length;
    const actionLength = this.tableConfig.row_action ? 1 : 0;
    const isCheckbox = this.hasCheckbox ? 1 : 0;
    const isRowDetails = this.rowDetails ? 1 : 0;

    return columnLength + actionLength + isCheckbox + isRowDetails;
  }

  public selectedDate: string = '';
  public selectedValue: string = '';

  handleDropdown() {
    this.dateDropdownOpen =! this.dateDropdownOpen;
  }

  handleDateFilter(value: string) {
    this.selectedValue = value;
    let today = new Date();
    let formattedDate = today.getFullYear() + '-' 
               + String(today.getMonth() + 1).padStart(2, '0') + '-' 
               + String(today.getDate()).padStart(2, '0');

    if(this.selectedValue) {
      if (this.selectedValue === 'today') {
        this.filter['date']['start_date'] = formattedDate;
        this.filter['date']['to_date'] = formattedDate;
      } else if (this.selectedValue === 'yesterday') {
        let yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        formattedDate = yesterday.getFullYear() + '-' 
                      + String(yesterday.getMonth() + 1).padStart(2, '0') + '-' 
                      + String(yesterday.getDate()).padStart(2, '0');
        this.filter['date']['start_date'] = formattedDate;
        this.filter['date']['to_date'] = formattedDate;
      } else if (this.selectedValue === '7_days') {
        let sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(today.getDate() - 7);
        formattedDate = sevenDaysAgo.getFullYear() + '-' 
                      + String(sevenDaysAgo.getMonth() + 1).padStart(2, '0') + '-' 
                      + String(sevenDaysAgo.getDate()).padStart(2, '0');
        this.filter['date']['start_date'] = formattedDate;
        this.filter['date']['to_date'] = today.getFullYear() + '-' 
                                          + String(today.getMonth() + 1).padStart(2, '0') + '-' 
                                          + String(today.getDate()).padStart(2, '0');
      } else if (this.selectedValue === '30_days') {
        let thirtyDaysAgo = new Date(today);
        thirtyDaysAgo.setDate(today.getDate() - 30);
        formattedDate = thirtyDaysAgo.getFullYear() + '-' 
                      + String(thirtyDaysAgo.getMonth() + 1).padStart(2, '0') + '-' 
                      + String(thirtyDaysAgo.getDate()).padStart(2, '0');
        this.filter['date']['start_date'] = formattedDate;
        this.filter['date']['to_date'] = today.getFullYear() + '-' 
                                          + String(today.getMonth() + 1).padStart(2, '0') + '-' 
                                          + String(today.getDate()).padStart(2, '0');
      } else if (this.selectedValue === 'this_month') {
        let startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        let endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Last day of the month
      
        let formattedStartDate = startOfMonth.getFullYear() + '-' 
                                + String(startOfMonth.getMonth() + 1).padStart(2, '0') + '-' 
                                + String(startOfMonth.getDate()).padStart(2, '0');
      
        let formattedEndDate = endOfMonth.getFullYear() + '-' 
                              + String(endOfMonth.getMonth() + 1).padStart(2, '0') + '-' 
                              + String(endOfMonth.getDate()).padStart(2, '0');
      
        this.filter['date']['start_date'] = formattedStartDate;
        this.filter['date']['to_date'] = formattedEndDate; // Last day of the month
      }
       else if (this.selectedValue === 'last_month') {
        let firstDayLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        let lastDayLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        formattedDate = firstDayLastMonth.getFullYear() + '-' 
                      + String(firstDayLastMonth.getMonth() + 1).padStart(2, '0') + '-' 
                      + String(firstDayLastMonth.getDate()).padStart(2, '0');
        this.filter['date']['start_date'] = formattedDate;
        formattedDate = lastDayLastMonth.getFullYear() + '-' 
                      + String(lastDayLastMonth.getMonth() + 1).padStart(2, '0') + '-' 
                      + String(lastDayLastMonth.getDate()).padStart(2, '0');
        this.filter['date']['to_date'] = formattedDate;
      }
    }

    this.selectedDate = `${this.filter['date']['start_date']} - ${this.filter['date']['to_date']}` 
    this.dateDropdownOpen = false;
    this.applyFilters();

  }

  onDateSelection(event: any) {    
    if (event[0] && event[1]) {
      const fromDate = event[0];
      const toDate = event[1];
  
      this.filter['date']['start_date'] = `${fromDate.getFullYear()}-${String(fromDate.getMonth() + 1).padStart(2, '0')}-${String(fromDate.getDate()).padStart(2, '0')}`;
      this.filter['date']['to_date'] = `${toDate.getFullYear()}-${String(toDate.getMonth() + 1).padStart(2, '0')}-${String(toDate.getDate()).padStart(2, '0')}`;
      
      this.selectedDate = `${this.filter['date']['start_date']} - ${this.filter['date']['to_date']}`;

      console.log("this.selectedDate", this.selectedDate);
      
      this.selectedValue = '';
      
      this.applyFilters();
    }
  }

  applyFilters() {
    let filteredData = [...this.tableConfig.data];
  
    // Search filter
    if (this.filter['search'].trim() !== '') {
      filteredData = filteredData.filter((item: any) => {
        return Object.keys(item).some(key => {
          const value = item[key];
          if (typeof value === 'string' || typeof value === 'object') {
            const valueString = typeof value === 'string' ? value : value?.toString();
            
            if (valueString?.toLowerCase()?.includes(this.filter['search']?.toLowerCase())) {
              return true;
            }
          }
          if (typeof value === 'number' && value?.toString()?.includes(this.filter['search'])) {
            return true;
          }
    
          return false;
        });
      });
    }
    
    // Sorting filter
    if (this.filter['sort']) {
      filteredData.sort((a: any, b: any): number => {
        const valueA = a[this.sortable_key];
        const valueB = b[this.sortable_key];
        const getTextContent = (value: any): string => {
          if (typeof value === 'string') {
            return value;
          }
          if (typeof value === 'object') {
            const div = document.createElement('div');
            div.innerHTML = value.toString(); 
            return div.textContent || div.innerText || ''; 
          }
          return '';
        };
        const textA = getTextContent(valueA);
        const textB = getTextContent(valueB);
        if ((typeof valueA === 'string' || typeof valueA === 'object') &&
            (typeof valueB === 'string' || typeof valueB === 'object')) {
          return this.filter['sort'] === 'asc'
            ? textA.localeCompare(textB)
            : textB.localeCompare(textA);
        }
        if (typeof valueA === 'number' && typeof valueB === 'number') {
          return this.filter['sort'] === 'asc'
            ? valueA - valueB
            : valueB - valueA;
        }
    
        return 0;
      });
    }
    
    // Date range filter
    if (this.filter['date']['start_date']) {
  
      filteredData = filteredData.filter((data: any) => {
        if (data && data.date) {
          const recordDate = new Date(data.date);
          const fromDate = new Date(this.filter['date']['start_date']);
          const toDate = this.filter['date']['to_date'] ? new Date(this.filter['date']['to_date']) : null;
  
          if (fromDate && toDate) {
            return recordDate >= fromDate && recordDate <= toDate;
          } else if (fromDate) {
            return recordDate >= fromDate;
          } else if (toDate) {
            return recordDate <= toDate;
          }
        }
        return true;
      });
    }
  
    // Pagination
    this.paginate = this.tableService.getPager(filteredData.length, this.filter['page'], this.filter['pageSize']);
    this.tableData = filteredData.slice(this.paginate.start_index, this.paginate.end_index + 1);
  }

  emitAction(action: any, row: any) {
    this.action.emit({
      action_to_perform: action.action_to_perform,
      data: row
    });
  }

  handleExport(type: string) {
    const dataToExport = this.tableData; // Données actuellement affichées

    switch(type) {
      case 'copy':
        this.copyToClipboard(dataToExport);
        break;
      case 'csv':
        this.exportToCSV(dataToExport);
        break;
      case 'excel':
        this.exportToExcel(dataToExport);
        break;
      case 'pdf':
        this.exportToPDF(dataToExport);
        break;
      case 'print':
        this.printTable();
        break;
    }

    // Émettre l'événement pour une gestion personnalisée
    this.onExport.emit({ type, data: dataToExport });
  }

  copyToClipboard(data: any[]) {
    const headers = this.tableConfig.columns.map((col:any) => col?.header).join('\t');
    const rows = data.map(row =>
        this.tableConfig.columns.map((col:any) =>
            this.getNestedPropertyValue(col?.field, row)
        ).join('\t')
    );

    const textToCopy = [headers, ...rows].join('\n');

    navigator.clipboard.writeText(textToCopy).then(() => {
      console.log('Données copiées dans le presse-papier');
      // Vous pouvez ajouter une notification de succès ici
    });
  }

  exportToCSV(data: any[]) {
    const headers = this.tableConfig.columns.map((col:any) => col?.header).join(',');
    const rows = data.map(row =>
        this.tableConfig.columns.map((col:any) => {
          const value = this.getNestedPropertyValue(col?.field, row);
          return `"${String(value).replace(/"/g, '""')}"`;
        }).join(',')
    );

    const csv = [headers, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `export_${new Date().getTime()}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  exportToExcel(data: any[]) {
    // Si vous avez installé xlsx: npm install xlsx
    import('xlsx').then(XLSX => {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
      XLSX.writeFile(workbook, `export_${new Date().getTime()}.xlsx`);
    }).catch(() => {
      console.error('xlsx library not found. Install it with: npm install xlsx');
    });
  }



  exportToPDF(data: any[]) {
    try {
      if (!data || data.length === 0) {
        alert('Aucune donnée à exporter');
        return;
      }

      Promise.all([
        import('jspdf'),
        import('jspdf-autotable')
      ]).then(([jsPDFModule, autoTableModule]) => {
        const { jsPDF } = jsPDFModule;
        const autoTable = autoTableModule.default;

        const doc = new jsPDF();

        doc.setFontSize(16);
        doc.text('Export des données', 14, 15);

        // ✅ Support des deux formats: field/header OU field_value/title
        const headers = [
          this.tableConfig.columns.map((col: any) =>
              col.header || col.title || ''
          )
        ];

        const rows = data.map((row) => {
          return this.tableConfig.columns.map((col: any) => {
            const field = col.field || col.field_value;
            const value = this.getNestedPropertyValue(field, row);
            return this.formatValueForExport(value);
          });
        });

        autoTable(doc, {
          head: headers,
          body: rows,
          startY: 28,
          styles: { fontSize: 9, cellPadding: 3 },
          headStyles: { fillColor: [102, 126, 234], fontStyle: 'bold' },
          theme: 'grid'
        });

        doc.save(`export_${Date.now()}.pdf`);
        this.onPDF.emit(data);

      });
    } catch (error) {
      console.error('❌ Erreur export PDF:', error);
    }
  }


  /**
   * Formate une valeur pour l'export (dynamique)
   */
  private formatValueForExport(value: any): string {
    // Null/undefined
    if (value === null || value === undefined) {
      return '';
    }

    // Boolean
    if (typeof value === 'boolean') {
      return value ? 'Oui' : 'Non';
    }

    // Number
    if (typeof value === 'number') {
      return value.toLocaleString('fr-FR');
    }

    // String
    if (typeof value === 'string') {
      return value.trim();
    }

    // Date
    if (typeof value === 'object' && value !== null) {
      // Vérifier si c'est une Date
      if (typeof value.getTime === 'function') {
        try {
          return new Date(value).toLocaleDateString('fr-FR');
        } catch {
          return String(value);
        }
      }

      // Array
      if (Array.isArray(value)) {
        return value.map(v => this.formatValueForExport(v)).join(', ');
      }

      // Object (afficher une propriété pertinente si possible)
      if (value.libelle || value.name || value.label) {
        return value.libelle || value.name || value.label;
      }

      // Sinon, JSON
      try {
        return JSON.stringify(value);
      } catch {
        return '[Object]';
      }
    }

    // Fallback
    return String(value);
  }

  printTable() {
    window.print();
  }
}

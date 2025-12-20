import { Injectable } from "@angular/core";

@Injectable({ 
  providedIn: 'root' 
})

export class TableService {

  public searchText: string = '';

  // Get Pager For Pagination
  getPager(total_items: number, current_page: number, page_size: number) {

    // calculate total pages
    let total_pages = Number(Math.ceil(Number(total_items) / Number(page_size)));

    // Paginate Range
    let paginateRange = 3;

    // ensure current page isn't out of range
    if (Number(current_page) < 1) {
      current_page = 1;
    } else if (Number(current_page) > Number(total_pages)) {
      current_page = Number(total_pages);
    }

    let start_page: number, end_page: number;
    if (Number(total_pages) <= Number(paginateRange)) {
      // Less than or equal to the paginateRange
      start_page = 1;
      end_page = Number(total_pages);
    } else if (Number(current_page) <= Number(Math.floor(Number(paginateRange) / 2))) {
      // Near the beginning
      start_page = 1;
      end_page = Number(paginateRange);
    } else if (Number(current_page) >= Number(total_pages) - Number(Math.floor(Number(paginateRange) / 2))) {
      // Near the end
      start_page = Number(total_pages) - Number(paginateRange) + 1;
      end_page = Number(total_pages);
    } else {
      // In the middle
      start_page = Number(current_page) - Number(Math.floor(Number(paginateRange) / 2));
      end_page = Number(current_page) + Number(Math.floor(Number(paginateRange) / 2));
    }

    // calculate start and end item indexes
    let start_index = (Number(current_page) - 1) * Number(page_size);
    let end_index = Math.min(Number(start_index) + Number(page_size) - 1, Number(total_items) - 1);


    // create an array of pages to ng-repeat in the pager control
    let pages = Array.from(Array((Number(end_page) + 1) - Number(start_page)).keys()).map(i => Number(start_page) + Number(i));

    // return object with all pager properties required by the view
    return {
      total_items: total_items,
      current_page: current_page,
      page_size: page_size,
      total_pages: total_pages,
      start_page: start_page,
      end_page: end_page,
      start_index: start_index,
      end_index: end_index,
      pages: pages
    };

  }
}


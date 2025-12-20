import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { layouts } from '../../../../data/layout';
import { Layout } from '../../../../interface/layout';
import { LayoutService } from '../../../../services/layout.service';

@Component({
  selector: 'app-layout-customizer',
  imports: [],
  templateUrl: './layout-customizer.component.html',
  styleUrl: './layout-customizer.component.scss'
})

export class LayoutCustomizerComponent {

  @Output() layoutOpen = new EventEmitter();

  public layouts = layouts;
  public layout = localStorage.getItem('layout');
  constructor(private router: Router, private route: ActivatedRoute, private layoutService: LayoutService) {
    if(this.layout != null){
      this.layoutService.applyLayout(this.layout)
    }
  }

  closeCustomizer() {
    this.layoutOpen.emit(false);
  }

  ngOnInit() {
    const savedLayout = localStorage.getItem('layout');

    if (savedLayout) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { layout: savedLayout },
        queryParamsHandling: 'merge'
      });
    }
  }

  applyLayout(layout: Layout) {
    localStorage.setItem('layout', layout.slug);

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { layout: layout.slug },
      queryParamsHandling: 'merge'
    }).then(() => {
      window.location.reload();
    });

    this.closeCustomizer();
  }
  
}

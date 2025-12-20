import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss'
})
export class CounterComponent {

  @Input() counter: any;
  
  public displayValue: string = '0';
  public count: number = 0;
  public intervalTime: number = 50;

  ngOnChanges() {
    this.startCounter();
  }

  startCounter() {
    let value = String(this.counter);

    let numericValue = parseInt(value.replace(/[^0-9]/g, ''), 10) || 0;
    let prefix = value.startsWith('$') ? '$' : value.startsWith('₹') ? '₹' : '';
    let suffix = value.endsWith('%') ? '%' : value.endsWith('+') ? '+' : '';

    let step = Math.ceil(numericValue / 100);
    let interval = setInterval(() => {
      if (this.count < numericValue) {
        this.count += step;
        this.displayValue = `${prefix}${this.formatValue(this.count)}${suffix}`;
      } else {
        this.count = numericValue;
        this.displayValue = `${prefix}${this.formatValue(this.count)}${suffix}`;
        clearInterval(interval);
      }
    }, this.intervalTime);
  }

  formatValue(value: number): string {
    return new Intl.NumberFormat('en-IN').format(value);
  }
  
}

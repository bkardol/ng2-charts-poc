import { Component } from '@angular/core';
import { faEuroSign, faFire, faPlug } from '@fortawesome/free-solid-svg-icons';
import { ChartOptions } from 'chart.js';

import { electricity, gas } from './data';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent {
  primaryColor: string;
  accentColor: string;
  activeFilter = 'electricity';

  euroIcon = faEuroSign;
  electricityIcon = faPlug;
  gasIcon = faFire;

  data?: any[];
  labels?: any[];

  options: ChartOptions = {
    responsive: true,
  };

  get isElectricity() {
    return this.activeFilter === 'electricity';
  }

  constructor() {
    var style = getComputedStyle(document.body);
    this.primaryColor = style.getPropertyValue('--primary-color');
    this.accentColor = style.getPropertyValue('--accent-color');

    this.setData();
  }

  setActive(filter: string) {
    this.activeFilter = filter;
    this.setData();
  }

  private setData() {
    const data = this.isElectricity
      ? this.modifyElectricityStructure(
          this.flattenElectricityStructure(electricity)
        )
      : [
          {
            label: 'Verbruik',
            data: gas.map((g) => g.value),
            backgroundColor: this.accentColor,
          },
        ];
    const labels = this.getLabels(this.isElectricity ? electricity : gas);

    Object.assign(this, { data, labels });
  }

  private flattenElectricityStructure(
    data: {
      name: string;
      series: { name: string; value: number }[];
    }[]
  ) {
    return data.reduce<{ name: string; value: number }[]>(
      (prev, next) => [...prev, ...next.series],
      []
    );
  }

  private modifyElectricityStructure(
    series: { name: string; value: number }[]
  ) {
    return series.reduce<
      { data: number[]; label: string; backgroundColor: string }[]
    >((prev, curr) => {
      let group = prev.find((s) => s.label === curr.name);
      if (!group) {
        group = {
          label: curr.name,
          data: [],
          backgroundColor: this.getElectricityColor(curr.name),
        };
        prev.push(group);
      }
      group.data.push(curr.value);
      return prev;
    }, []);
  }

  private getElectricityColor(name: string) {
    return name === 'Verbruik' ? this.accentColor : this.primaryColor;
  }

  private getLabels(data: Partial<{ name: string }>[]) {
    return data.map((d) => d.name);
  }
}

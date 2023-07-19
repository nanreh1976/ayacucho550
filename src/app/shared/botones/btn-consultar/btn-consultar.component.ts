import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-btn-consultar',
  template: `
    <button class="btn btn-primary" style="border-radius: 10%;  margin: 10px;">
      <!-- <i class="bi bi-pencil"></i> -->

      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 1000 1000"
        width="16"
        height="16"
        enable-background="new 0 0 1000 1000"
        xml:space="preserve"
      >
        <metadata>
          Svg Vector Icons : http://www.onlinewebfonts.com/icon
        </metadata>
        <g>
          <path
            style="fill: white"
            d="M377.5,500c0,67.7,54.8,122.5,122.5,122.5c67.7,0,122.5-54.8,122.5-122.5c0-67.7-54.8-122.5-122.5-122.5C432.3,377.5,377.5,432.3,377.5,500z"
          />
          <path
          style="fill: white"
            d="M500,193.8c-270.6,0-490,245-490,306.3s219.4,306.3,490,306.3s490-245,490-306.3S770.6,193.8,500,193.8z M500,683.8c-101.5,0-183.8-82.3-183.8-183.8S398.5,316.3,500,316.3S683.8,398.5,683.8,500S601.5,683.8,500,683.8z"
          />
        </g>
      </svg>

      {{ name || 'Editar' }}
    </button>
  `,
  styles: [``],
})
export class BtnConsultarComponent implements OnInit {
  @Input() name?: string;
  constructor() {}

  ngOnInit(): void {}
}

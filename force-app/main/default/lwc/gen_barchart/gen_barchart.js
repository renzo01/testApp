import { api, LightningElement } from 'lwc';
import chartjs from '@salesforce/resourceUrl/chart2Js';
import { loadScript } from 'lightning/platformResourceLoader';
export default class Gen_barchart extends LightningElement {
    @api chartConfig;

    isChartJsInitialized;
    renderedCallback(){
        if(this.isChartJsInitialized) return;

        Promise.all([loadScript(this, chartjs)])
            .then(() =>{
                this.isChartJsInitialized = true;
                const ctx = this.template.querySelector('canvas.barChart').getContext('2d');
                this.chart = new window.Chart(ctx, JSON.parse(JSON.stringify(this.chartConfig)));
            })
            .catch(error => {
                console.log(error);
            })
    }
}
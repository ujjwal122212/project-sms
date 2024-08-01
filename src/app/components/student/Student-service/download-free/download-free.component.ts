import { Component } from '@angular/core';

@Component({
  selector: 'app-download-free',
  standalone: true,
  imports: [],
  templateUrl: './download-free.component.html',
  styleUrl: './download-free.component.css'
})
export class DownloadFreeComponent {
printP(fees:string) {
  const backup:string=document.body.innerHTML;
  const feesElement:HTMLElement|null=document.getElementById(fees);
  if (feesElement) {
    const feesPrint:string=feesElement.innerHTML;
    document.body.innerHTML=feesPrint;
    window.print();
    document.body.innerHTML=backup;
}else{
  console.error(`Element with id '${fees}'not found`)
}
}
}

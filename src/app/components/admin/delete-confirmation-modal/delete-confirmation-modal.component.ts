import { Component, ElementRef, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-delete-confirmation-modal',
  standalone: true,
  imports: [],
  templateUrl: './delete-confirmation-modal.component.html',
  styleUrl: './delete-confirmation-modal.component.css'
})
export class DeleteConfirmationModalComponent implements OnInit{
@Input() toggleModal = new EventEmitter<boolean>()
@ViewChild('deleteModal') deleteModal!: ElementRef;

 ngOnInit(): void {
   this.toggleModal.subscribe(show=>{
    console.log("del modal toggled");
    
    const modalElement = this.deleteModal.nativeElement;
    if(show){
      modalElement.classList.remove('hidden')
    }else{
      modalElement.classList.add('hidden')
    }
   })
 }
}

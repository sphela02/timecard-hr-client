import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FlexModalContent } from '../shared';

declare var $: any;

@Component({
  selector: 'tc-flex-modal',
  templateUrl: './flex-modal.component.html',
  styleUrls: ['./flex-modal.component.scss']
})
export class FlexModalComponent implements OnInit {
  @Input() modalContent: FlexModalContent;
  @Output() cancelModalBtnClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() altModalBtnClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() confirmModalBtnClicked: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    public activeModal: NgbActiveModal,
    ) {}

  ngOnInit() {
    if (!this.modalContent.cancelBtnText) {
      this.modalContent.cancelBtnText = 'Cancel';
    }

    if (!this.modalContent.confirmBtnText) {
      this.modalContent.confirmBtnText = 'Ok';
    }
  } // end ngOnInit

  cancelModal() {
    this.cancelModalBtnClicked.emit(true);
    this.activeModal.close('Cancel Clicked');
  }

  altModalFunction() {
    this.altModalBtnClicked.emit(true);
    this.activeModal.close('Alt Clicked');
  }

  confirmModal() {
    let formValues = null;
    if (this.modalContent.inputId || this.modalContent.textareaId) {
      let isFormValid: boolean = true;
      formValues = {
        inputValue: $('#' + this.modalContent.inputId ).val(),
        textareaValue: $('#' + this.modalContent.textareaId ).val()
      };

      // Validate values have been added to fields if shown.
      if (this.modalContent.inputId && formValues.inputValue === '') {
        $('#' + this.modalContent.inputId ).addClass('invalid');
        isFormValid = false;
      } else {
        $('#' + this.modalContent.inputId ).removeClass('invalid');
      }

      if (this.modalContent.textareaId && formValues.textareaValue === '') {
        $('#' + this.modalContent.textareaId ).addClass('invalid');
        isFormValid = false;
      } else {
        $('#' + this.modalContent.textareaId ).removeClass('invalid');
      }

      if (isFormValid === true) {
        this.confirmModalBtnClicked.emit(formValues);
        this.activeModal.close('Confirm Clicked');
      }
    } else {
      this.activeModal.close('Confirm Clicked');
    }
  }
}

// ************** How to Use this Component *********

// Required imports:
// import { FlexModalContent } from '../../shared/shared';
// import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
// import { FlexModalComponent } from '../../shared/flex-modal/flex-modal.component';

// Define private Modal variable in constructor to call ng-bootstrap modal.
// private modal: NgbModal

// Create Function to open ng-bootstrap modal with flex-modal content.
// // openModal = Custom function name.

// openModal() {

// // Name const variable to handle custom modal content. testModelContent = custom var name.
//   const testModalContent: FlexModalContent = {} as FlexModalContent;

// // Set ng-bootstrap model options.
//   const modalOptions: NgbModalOptions = {
//     backdrop : 'static',
//     keyboard : false,
//     centered: true,
//   };

// // Set Modal Content. All variables do not need to be defined.

//   testModalContent.modalTitle = 'Test'; // Leave blank to hide header.
//   testModalContent.modalSubTitle = ''; // Leave blank to hide. Requires Title.
//   testModalContent.messageText = 'Testing'; // Leave blank to hide Message Text.
//   testModalContent.inputId = '';  // Leave blank to hide Small Input.
//   testModalContent.inputLabel = ''; // Leave blank to hide. Requires inputId.
//   testModalContent.textareaId = ''; // Leave blank to hide Large Textarea.
//   testModalContent.textareaLabel = '';  // Leave blank to hide. Requires textaraId.
//   testModalContent.cancelBtnText = '';  // Leave blank to use default, "Cancel"
//   testModalContent.altBtnText = '';  // Leave blank to hide altBtn
//   testModalContent.confirmBtnText = '';  // Leave blank to use default, "Ok"


//   // Open the flex modal popup, pass modal defined content.
//   const popupModalRef = this.modal.open(FlexModalComponent, modalOptions);
//   popupModalRef.componentInstance.modalContent = testModalContent;

//   // Subscribe to cancelModalBtnClicked, in case we need it.
//   popupModalRef.componentInstance.cancelModalBtnClicked.subscribe(event => {
//     // Cancel was clicked ... do anything necessary here.
//   });

//   // Subscribe to altModalBtnClicked, in case we need it.
//   popupModalRef.componentInstance.altModalBtnClicked.subscribe(event => {
//     // Alt button was clicked ... do anything necessary here.
//   });

//   // Subscribe to confirmModalBtnClicked, in case we need it.
//   popupModalRef.componentInstance.confirmModalBtnClicked.subscribe(event => {
//     // Cancel was clicked ... do anything necessary here.

//     // Get Input Values, if used.
//     const formValues = event;
//   });
// }
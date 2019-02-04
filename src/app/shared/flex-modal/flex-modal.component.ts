import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FlexModalContent, FlexModalReturnData } from '../shared';
import { Subject } from 'rxjs/Subject';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

declare var $: any;

@Component({
  selector: 'tc-flex-modal',
  templateUrl: './flex-modal.component.html',
  styleUrls: ['./flex-modal.component.scss']
})
export class FlexModalComponent implements OnInit, AfterViewInit {
  @Input() modalContent: FlexModalContent;
  @Output() cancelModalBtnClicked: EventEmitter<Boolean> = new EventEmitter<Boolean>();
  @Output() altModalBtnClicked: EventEmitter<Boolean> = new EventEmitter<Boolean>();
  @Output() confirmModalBtnClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() formDataChanged$: Subject<FlexModalReturnData> = new Subject<FlexModalReturnData>();

  formData: FlexModalReturnData = {} as FlexModalReturnData;

  private _internalFormDataChanged$: Subject<void> = new Subject<void>();

  // For canDeactivate modals that prevent navigation.
  navigateAwaySelection$: Subject<boolean> = new Subject<boolean>();

  // Observable for (re)building the select
  setupSelect$: Subject<void> = new Subject<void>();

  messageText: SafeHtml;

  constructor(
    public activeModal: NgbActiveModal,
    private sanitizer: DomSanitizer,
    ) {}

  ngOnInit() {
    // pass safe HTML from components.
    this.messageText = this.sanitizer.bypassSecurityTrustHtml(this.modalContent.messageText);

    // We want a modal ID, so set a default if not passed
    if (!this.modalContent.modalID) {
      this.modalContent.modalID = 'flex-modal-popup';
    }

    if (!this.modalContent.cancelBtnText) {
      this.modalContent.cancelBtnText = 'Cancel';
    }

    if (!this.modalContent.confirmBtnText) {
      this.modalContent.confirmBtnText = 'Ok';
    }

    // Set default max-length for input field.
    if (!this.modalContent.inputMaxLength) {
      this.modalContent.inputMaxLength = 60;
    }

    if (!this.modalContent.hideConfirmButton) {
      this.modalContent.hideConfirmButton = false;
    } // Default hide confirm to false

    if (!this.modalContent.hideCancelButton) {
      this.modalContent.hideCancelButton = false;
    } // Default hide cancel to false

    if (!this.modalContent.showCloseButton) {
      this.modalContent.showCloseButton = false;
    } // Default show top close button to false

    // Set defaults for a selection if we have it
    if (this.modalContent.selectionID) {

      // Default placeholder for select if none passed in
      if (!this.modalContent.selectionPlaceHolderText) {
        this.modalContent.selectionPlaceHolderText = 'Please Select';
      } // end if no placeholder text passed in for select

    } // end if select defined

    // Set up listener for change detection
    this._internalFormDataChanged$.debounceTime(300).subscribe(() => {
      this.formDataChanged$.next(this.formData);
    });

    this._setupChangeListener();
  } // end ngOnInit

  private _setupChangeListener() {

    // Listen to changes on each field
    setTimeout(() => {

      if (this.modalContent.inputId) {
        const inputHash = '#' + this.modalContent.inputId;
        if (!$(inputHash).data('listenersReady')) {

          $(inputHash).on('change', (e) => {
            this.formData.inputValue = e.target.value;
            this._internalFormDataChanged$.next();
          });

          $(inputHash).data('listenersReady', true);
        } // end if listener not ready for input

      } // end if text input defined

      // Set up text area listener, if not set up yet
      if (this.modalContent.textareaId) {
        const textAreaHash = '#' + this.modalContent.textareaId;
        if (!$(textAreaHash).data('listenersReady')) {

          $(textAreaHash).on('change', (e) => {
            this.formData.textareaValue = e.target.value;
            this._internalFormDataChanged$.next();
          });

          $(textAreaHash).data('listenersReady', true);
        } // end if listener not ready for text area
      } // end if text area defined

      // Set up selection listener, if not set up yet
      if (this.modalContent.selectionID) {
        const selectionHash = '#' + this.modalContent.selectionID;
        if (!$(selectionHash).data('listenersReady')) {

          $(selectionHash).on('change', (e) => {
              this.formData.selectionValue = e.target.value;
              this._internalFormDataChanged$.next();
            }); // end on change

            $(selectionHash).data('listenersReady', true);
        } // end if listeners not ready
      } // end if selection defined

    }, 0);

  } // end setupChangeListener

  ngAfterViewInit() {

    this.setupSelect$.subscribe(() => {
      setTimeout(() => {
        // Initialize the MDB selects
        $('#' + this.modalContent.modalID + ' .mdb-select').material_select('destroy');
        $('#' + this.modalContent.modalID + ' .mdb-select').material_select();
        $('#' + this.modalContent.modalID + ' .mdb-select').fixMDBSelectDropdown();
      }, 0);
    }); // end subscribe setup select

    // Execute initial setup select
    this.setupSelect$.next();

    setTimeout(() => {
      // Set focus if input is available else focus on textarea.
      if (this.modalContent.inputId) {
        $('input').first().focus();
      } else if (this.modalContent.textareaId) {
        $('textarea').first().focus();
      }
    }, 0);
  } // end ngAfterViewInit

  updateModalContent() {
    // Called after modal content gets update, so we can react

    // Execute setup select again, in case it just got turned on
    this.setupSelect$.next();

    this._setupChangeListener();
  } // end updateModalContent

  cancelModal() {
    this.cancelModalBtnClicked.emit(true);
    this.activeModal.close('Cancel Clicked');
  }

  altModalFunction() {
    this.altModalBtnClicked.emit(true);
    this.activeModal.close('Alt Clicked');
  }

  confirmModal() {
    if (this.modalContent.inputId || this.modalContent.textareaId || this.modalContent.selectionID) {
      let isFormValid: boolean = true;

      // Validate values have been added to fields if shown.

      if (this.modalContent.inputId) {

        if (!this.formData.inputValue
            &&
            (!this.modalContent.inputOptional)
          ) {
          $('#' + this.modalContent.inputId ).addClass('invalid');
          isFormValid = false;
        } else {
          $('#' + this.modalContent.inputId ).removeClass('invalid');
        } // end input validation OK or not

      } // end if input defined

      if (this.modalContent.textareaId) {

        if (!this.formData.textareaValue
              &&
              (!this.modalContent.textareaOptional)
            ) {
          $('#' + this.modalContent.textareaId ).addClass('invalid');
          isFormValid = false;
        } else {
          $('#' + this.modalContent.textareaId ).removeClass('invalid');
        }

      } // end if text area defined

      if (this.modalContent.selectionID) {

        if (!this.formData.selectionValue
              &&
              !this.modalContent.selectionOptional
            ) {
          $('#' + this.modalContent.selectionID ).addClass('invalid');
          $('#' + this.modalContent.selectionID ).parent().siblings('.invalid-feedback').css('display', 'block');
          $('#audit-explanation-select').siblings('.select-dropdown').addClass('invalid');
          isFormValid = false;
        } else {
          $('#' + this.modalContent.selectionID ).removeClass('invalid');
          $('#' + this.modalContent.selectionID ).parent().siblings('.invalid-feedback').css('display', 'none');
          $('#' + this.modalContent.selectionID ).siblings('.select-dropdown').removeClass('invalid');
        } // end if validation ok or not for select

      } // end if selection defined

      if (isFormValid === true) {
        this.confirmModalBtnClicked.emit(this.formData);
        this.activeModal.close('Confirm Clicked');
      }
    } else {
      this.confirmModalBtnClicked.emit(true);
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
//   testModalContent.selectionID = ''; // Optional select id (default is select_id)
//   testModalContent.selectionChoices = []; // Populate with FlexModalSelectionChoice[] for select box
//   testModalContent.selectionOptional = true; // Selection required by default, if it's visible.
//   testModalContent.inputId = '';  // Leave blank to hide Small Input.
//   testModalContent.inputLabel = ''; // Leave blank to hide. Requires inputId.
//   testModalContent.textareaId = ''; // Leave blank to hide Large Textarea.
//   testModalContent.textareaLabel = '';  // Leave blank to hide. Requires textaraId.
//   testModalContent.textareaOptional = true; // Large textarea required by default, if it's visible
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

//   // Subscribe to any form data changes in real time, if you need them
//   popupModalRef.componentInstance.formDataChanged$.subscribe((currentFormData: FlexModalReturnData) => {
//     // Act on the current form data here, if needed
//   });

//   // Update modal content and notify the component that changes were made.
//   testModalContent.textareaId = 'new_textarea_id'; // Leave blank to hide Large Textarea.
//   popupModalRef.componentInstance.updateModalContent();

//     // Get Input Values, if used.
//     const formValues = event;
//   });
// }

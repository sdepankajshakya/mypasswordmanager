import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, ChangeDetectorRef, OnInit } from '@angular/core';
import { ModalComponent } from '../shared/components/modal/modal.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RecordService } from '../shared/services/record.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports: [CommonModule, ModalComponent, ReactiveFormsModule]
})
export class SidebarComponent implements OnInit {
  @Input() collapsed = false;
  @Input() categories: any[] = []; // Categories for the Vault menu
  @Input() isMobile: boolean = false;
  @Output() categorySelected = new EventEmitter<any>();
  @Output() toggle = new EventEmitter<boolean>();
  @Output() createNewCategory = new EventEmitter<void>();
  @Output() createNewRecord = new EventEmitter<void>();

  selectedMenuItem: string | null = null;
  selectedCategory: any = null;
  isVaultCollapsed = true;
  isVaultSelected = false;
  isCreateNewDropdownVisible = false;

  isModalOpen = false;
  modalTitle = '';
  modalContent: 'record' | 'category' | null = null;

  recordForm!: FormGroup;
  categoryForm!: FormGroup;

  constructor(private fb: FormBuilder, private recordService: RecordService) { }
  
  ngOnInit(): void {
    this.initForms();
  }

  initForms(): void {
    this.recordForm = this.fb.group({
      category: [null, Validators.required],
      title: ['', [Validators.required, Validators.minLength(3)]]
    });

    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required]
    });
  }

  // Toggle sidebar collapse/expand
  toggleSidebar(): void {
    this.collapsed = !this.collapsed;
    this.toggle.emit(this.collapsed);
  }

  // Select a menu item, toggle the dropdown, and collapse the Vault
  selectMenuItem(item: string): void {
    if (item === 'createNew') {
      // Toggle the Create New dropdown when 'Create New' is clicked
      this.selectedMenuItem = this.selectedMenuItem === 'createNew' ? null : 'createNew';
    } else this.selectedMenuItem = item;

    this.isVaultCollapsed = true;
    this.isVaultSelected = false;
    this.selectedCategory = null;
  }

  // Handle modal open and set content
  selectCreateOption(option: 'category' | 'record'): void {
    if (option === 'category') {
      this.modalTitle = 'New Category';
      this.modalContent = 'category';
      this.categoryForm.reset();
    } else if (option === 'record') {
      this.modalTitle = 'New Record';
      this.modalContent = 'record';
      this.recordForm.reset();
    }
    this.isModalOpen = true;
  }

  // Toggle Vault visibility and selection state
  toggleVault(): void {
    this.isVaultCollapsed = !this.isVaultCollapsed;
    this.isVaultSelected = !this.isVaultSelected;
    this.selectedMenuItem = null; // Deselect any current menu item
  }

  // Select a category and emit it
  selectCategory(category: any): void {
    this.selectedCategory = category;
    this.categorySelected.emit(category);
  }

  // Handle confirmation action (called when the "Confirm" button is clicked)
  onConfirmAction(): void {
    if (this.modalContent === 'record' && this.recordForm.valid) {
      this.recordService.setRecord(this.recordForm.value);
      const selectedCategory = this.recordForm.value.category; // Get selected category
      this.openDetailsComponent(selectedCategory); // Dynamically open DetailsComponent with category
      this.isModalOpen = false;
      // Add logic to save the record
    } else if (this.modalContent === 'category' && this.categoryForm.valid) {
      console.log('Category Created:', this.categoryForm.value);
      // Add logic to save the category
    } else {
      // Mark all controls as touched to show validation errors
      this.recordForm.markAllAsTouched();
      this.categoryForm.markAllAsTouched();
    }
  }

  openDetailsComponent(category: string): void {
    // Logic to navigate or dynamically load DetailsComponent
    this.selectedCategory = category; // Pass this to DetailsComponent as an @Input
    this.categorySelected.emit(category);
  }

  onCloseModal(): void {
    this.isModalOpen = false;
    this.modalContent = null; // Reset the modal content
  }
}
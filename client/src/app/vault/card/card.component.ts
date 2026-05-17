import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { RecordService } from '../../shared/services/record.service';

@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
})
export class CardComponent implements OnInit {
  cardForm: FormGroup;

  constructor(private fb: FormBuilder, private recordService: RecordService) {
    this.cardForm = this.fb.group({
      cardHolderName: ['', [Validators.required, Validators.minLength(3)]],
      cardNumber: ['', [Validators.required, Validators.minLength(16), Validators.pattern(/^\d{16}$/)]],
      expiryDate: ['', [Validators.required, Validators.pattern(/^\d{2}\/\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
      pin: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
    });
  }

  ngOnInit(): void {
    console.log(this.recordService.getRecord());
  }

  onSubmit(): void {
    if (this.cardForm.valid) {
      console.log('Card Details:', this.cardForm.value);
      // Save card details
    } else {
      this.cardForm.markAllAsTouched(); // Show validation errors
    }
  }
}
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreEventDialogComponent } from './store-event-dialog.component';

describe('StoreEventDialogComponent', () => {
  let component: StoreEventDialogComponent;
  let fixture: ComponentFixture<StoreEventDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StoreEventDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StoreEventDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

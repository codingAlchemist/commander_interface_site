import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreOwnerItemComponent } from './store-owner-item.component';

describe('StoreOwnerItemComponent', () => {
  let component: StoreOwnerItemComponent;
  let fixture: ComponentFixture<StoreOwnerItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreOwnerItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreOwnerItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AchievmentListComponent } from './achievement-list.component';

describe('AchievmentListComponent', () => {
  let component: AchievmentListComponent;
  let fixture: ComponentFixture<AchievmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AchievmentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AchievmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

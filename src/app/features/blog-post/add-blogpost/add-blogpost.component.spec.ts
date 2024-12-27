import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBlogpostComponent } from './add-blogpost.component';

describe('AddBlogpostComponent', () => {
  let component: AddBlogpostComponent;
  let fixture: ComponentFixture<AddBlogpostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBlogpostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBlogpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

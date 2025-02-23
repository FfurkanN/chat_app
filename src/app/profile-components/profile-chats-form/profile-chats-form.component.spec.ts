import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileChatsFormComponent } from './profile-chats-form.component';

describe('ProfileChatsFormComponent', () => {
  let component: ProfileChatsFormComponent;
  let fixture: ComponentFixture<ProfileChatsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileChatsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileChatsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

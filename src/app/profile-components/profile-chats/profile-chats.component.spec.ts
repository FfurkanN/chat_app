import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileChatsComponent } from './profile-chats.component';

describe('ProfileChatsComponent', () => {
  let component: ProfileChatsComponent;
  let fixture: ComponentFixture<ProfileChatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileChatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileChatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

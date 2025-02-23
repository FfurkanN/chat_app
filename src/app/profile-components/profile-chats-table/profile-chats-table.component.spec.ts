import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileChatsTableComponent } from './profile-chats-table.component';

describe('ProfileChatsTableComponent', () => {
  let component: ProfileChatsTableComponent;
  let fixture: ComponentFixture<ProfileChatsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileChatsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileChatsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

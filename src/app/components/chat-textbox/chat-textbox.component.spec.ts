import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatTextboxComponent } from './chat-textbox.component';

describe('ChatTextboxComponent', () => {
  let component: ChatTextboxComponent;
  let fixture: ComponentFixture<ChatTextboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatTextboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatTextboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

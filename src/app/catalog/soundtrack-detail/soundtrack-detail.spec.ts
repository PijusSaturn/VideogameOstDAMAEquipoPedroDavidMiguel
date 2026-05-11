import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoundtrackDetail } from './soundtrack-detail';

describe('SoundtrackDetail', () => {
  let component: SoundtrackDetail;
  let fixture: ComponentFixture<SoundtrackDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoundtrackDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(SoundtrackDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

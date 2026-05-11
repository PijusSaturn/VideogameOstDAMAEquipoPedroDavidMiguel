import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Soundtracks } from './soundtracks';

describe('Soundtracks', () => {
  let component: Soundtracks;
  let fixture: ComponentFixture<Soundtracks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Soundtracks],
    }).compileComponents();

    fixture = TestBed.createComponent(Soundtracks);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

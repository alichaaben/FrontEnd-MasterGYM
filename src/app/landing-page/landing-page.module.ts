import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HeroComponent } from './hero/hero.component';
import { ContactComponent } from './contact/contact.component';
import { LandingPageComponent } from './landing-page.component';
import { SliderComponent } from './slider/slider.component';
import { FitnessComponent } from './fitness/fitness.component';
import { ProgramsComponent } from './programs/programs.component';
import { BestTrainerComponent } from './best-trainer/best-trainer.component';
import { ClubCardsComponent } from './club-cards/club-cards.component';
import { TrainingScheduleComponent } from './training-schedule/training-schedule.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { ViewTrainerComponent } from './view-trainer/view-trainer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    LandingPageComponent,
    HeaderComponent,
    FooterComponent,
    HeroComponent,
    ContactComponent,
    SliderComponent,
    FitnessComponent,
    ProgramsComponent,
    BestTrainerComponent,
    ClubCardsComponent,
    TrainingScheduleComponent,
    AboutComponent,
    ServicesComponent,
    ViewTrainerComponent,
    TestimonialsComponent,
    HomePageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class LandingPageModule { }

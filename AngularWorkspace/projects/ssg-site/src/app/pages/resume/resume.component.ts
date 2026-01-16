import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslatePipe } from 'lib/feature/translate/translate.pipe';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    TranslatePipe
  ],
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent {
  skills = {
    technical: [
      { key: 'RESUME.SKILLS.ITEMS.RUBY', level: 85 },
      { key: 'RESUME.SKILLS.ITEMS.JAVA', level: 80 },
      { key: 'RESUME.SKILLS.ITEMS.SQL', level: 90 },
      { key: 'RESUME.SKILLS.ITEMS.GIT', level: 85 },
      { key: 'RESUME.SKILLS.ITEMS.API', level: 88 },
      { key: 'RESUME.SKILLS.ITEMS.CLOUD', level: 75 }
    ],
    soft: [
      'RESUME.SKILLS.SOFT.PROBLEM_SOLVING',
      'RESUME.SKILLS.SOFT.COMMUNICATION',
      'RESUME.SKILLS.SOFT.COLLABORATION',
      'RESUME.SKILLS.SOFT.ADAPTABILITY'
    ]
  };

  experiences = [
    {
      titleKey: 'RESUME.EXPERIENCE.JOB1.TITLE',
      companyKey: 'RESUME.EXPERIENCE.JOB1.COMPANY',
      periodKey: 'RESUME.EXPERIENCE.JOB1.PERIOD',
      responsibilities: [
        'RESUME.EXPERIENCE.JOB1.RESP1',
        'RESUME.EXPERIENCE.JOB1.RESP2',
        'RESUME.EXPERIENCE.JOB1.RESP3',
        'RESUME.EXPERIENCE.JOB1.RESP4'
      ]
    },
    {
      titleKey: 'RESUME.EXPERIENCE.JOB2.TITLE',
      companyKey: 'RESUME.EXPERIENCE.JOB2.COMPANY',
      periodKey: 'RESUME.EXPERIENCE.JOB2.PERIOD',
      responsibilities: [
        'RESUME.EXPERIENCE.JOB2.RESP1',
        'RESUME.EXPERIENCE.JOB2.RESP2',
        'RESUME.EXPERIENCE.JOB2.RESP3'
      ]
    }
  ];

  projects = [
    {
      nameKey: 'RESUME.PROJECTS.PROJECT1.NAME',
      descKey: 'RESUME.PROJECTS.PROJECT1.DESC',
      techKey: 'RESUME.PROJECTS.PROJECT1.TECH'
    },
    {
      nameKey: 'RESUME.PROJECTS.PROJECT2.NAME',
      descKey: 'RESUME.PROJECTS.PROJECT2.DESC',
      techKey: 'RESUME.PROJECTS.PROJECT2.TECH'
    },
    {
      nameKey: 'RESUME.PROJECTS.PROJECT3.NAME',
      descKey: 'RESUME.PROJECTS.PROJECT3.DESC',
      techKey: 'RESUME.PROJECTS.PROJECT3.TECH'
    }
  ];
}

import { Component, OnInit} from '@angular/core';
import * as surveyData from '../../providers/testingData';
import { SurveyServiceService } from 'src/app/services/survey-service.service.js';
import { BehaviorSubject } from 'rxjs'
import { Router } from '@angular/router';
import { UsersServiceService } from 'src/app/services';
@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})


export class SurveyComponent implements OnInit {
  constructor( public mySurvey: SurveyServiceService, private router: Router, public userServ: UsersServiceService ) {

    this.mySurvey.courseVaue.subscribe(res=> {
      console.log('encuentes', res)
    });
   }
   nameUser
  questions;
  actualQuestion;
  ngOnInit() {
    
    this.questions = surveyData.data.questions;
    this.actualQuestion = this.questions[0];
  }

  findQuestion(id: number) {
    this.actualQuestion = this.questions.filter((x) => x.id === id)[0];
  }

  end() {
    const userData = JSON.parse(localStorage.getItem('user'));
    this.mySurvey.surveyResult(
      userData['_id'], this.actualQuestion.courseId).subscribe(res => {
        this.mySurvey.courseUpdate(res);
        this.router.navigate(['/main/courses'])
    },
    err => {
    });

  };  
  
};

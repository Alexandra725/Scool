import { Component, OnInit } from '@angular/core';
import { CoursesServicesService } from 'src/app/services/courses-services.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  courseSelected;
  courses: any = [];

  constructor(public courseService: CoursesServicesService) {

  }

  ngOnInit() {
    const userData = JSON.parse(localStorage.getItem('user'));
    this.courseService.getCourse(userData['_id']).subscribe((res)=> {
      this.courseSelected = res;   
    });

    this.courseService.getCourses()
    .subscribe(
      (data) => {
        this.courses = data;
        console.log(data);
      },
      (error) => {
        console.error(error);
      });

  }

  changingStatus() {
    
  }

  
  
}

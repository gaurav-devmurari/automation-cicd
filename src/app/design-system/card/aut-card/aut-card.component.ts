import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectList } from 'src/app/project/shared/model/project.model';

@Component({
  selector: 'aut-card',
  templateUrl: './aut-card.component.html',
  styleUrl: './aut-card.component.scss',
})
export class AutCardComponent {
  @Input() index: number;
  @Input() project: ProjectList;
  constructor(private route: Router){
  }
  getProjectDetails(projectId: string) {
    this.route.navigate([`/pipeline/edit/${projectId}`]);
  }
}

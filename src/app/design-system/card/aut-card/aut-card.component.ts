import { Component, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectList } from 'src/app/project/shared/model/project.model';
import { ProjectListService } from 'src/app/project/shared/services/project-list.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'aut-card',
  templateUrl: './aut-card.component.html',
  styleUrl: './aut-card.component.scss',
})
export class AutCardComponent {
  @Input() index: number;
  @Input() project: ProjectList;
  @Output() updateList: EventEmitter<boolean> = new EventEmitter<boolean>(
    false
  );

  constructor(
    private route: Router,
    private projectList: ProjectListService
  ) {}
  getProjectDetails(projectId: string) {
    this.route.navigate([`/pipeline/edit/${projectId}`]);
  }
  deleteProject(projectId: string) {
    const isDeleted = this.projectList.deleteProject(projectId);
    if (isDeleted) {
      this.updateList.emit(true);
    }
  }
}

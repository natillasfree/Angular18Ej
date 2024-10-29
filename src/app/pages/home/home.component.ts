import { Component, inject } from '@angular/core';
import { task } from '../../model/task';
import { CreateTaskComponent } from '../../components/create-task/create-task.component';
import { LocalDBService } from '../../services/local-db.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CreateTaskComponent, CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  db = inject(LocalDBService);

  todo: task[] = [];

  ngOnInit() {
    this.todo = this.db.load();
  }

  addTask(newTask: task) {
    this.todo.push(newTask);
    this.db.save(this.todo);
  }

  removeTask(id: number | undefined) {
    if (!id) return; 
    if (!confirm("¿Está seguro?")) return;

    this.todo = this.todo.filter(t => t.id != id);
    this.db.save(this.todo);
  }
  

  editTask(task: task) {
    task.isEditing = true;
  }

  saveEdit(task: task) {
    task.isEditing = false;
    this.db.save(this.todo); 
  }

  cancelEdit(task: task) {
    task.isEditing = false;
  }
}

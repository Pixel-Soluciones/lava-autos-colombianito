import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-main',
  imports: [RouterModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  constructor(private router: Router, private auth: AuthService) {}

  goToServices() {
    this.router.navigate(['list-services']);
  }

  goToEmployees() {
    this.router.navigate(['employees']);
  }

  goToReports() {
    this.router.navigate(['reports']);
  }

  goToVehicles() {
    this.router.navigate(['vehicles']);
  }

  logout() {
    Swal.fire({
      title: '¿Está seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#32cd32',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          showConfirmButton: false,
          title: 'Sesión cerrada',
          icon: 'success',
          timer: 1500,
        });
        this.auth.logout();
        this.router.navigate(['login']);
      }
    });
  }
}

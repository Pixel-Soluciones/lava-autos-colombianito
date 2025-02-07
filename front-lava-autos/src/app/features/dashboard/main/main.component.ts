import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-main',
  imports: [RouterModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  constructor(
    private router: Router,
    private auth: AuthService
  ){}

  goToServices(){
    this.router.navigate(['list-services']);
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['login']);

  }

}

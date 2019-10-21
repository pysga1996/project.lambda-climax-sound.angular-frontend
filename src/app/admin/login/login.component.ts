import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../../service/admin.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../service/auth.service';
import {UserService} from '../../service/user.service';
import {User} from '../../model/user';
import {createUrlResolverWithoutPackagePrefix} from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  @Output() adminLoginAction = new EventEmitter();
  currentUser: User;
  adminLoginForm: FormGroup;
  submitted = false;
  loading = false;
  message: string;
  error = false;
  returnUrl: string;
  subscription: Subscription = new Subscription();

  // tslint:disable-next-line:max-line-length
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router,
              private adminService: AdminService, private authService: AuthService, private userService: UserService) {
    userService.currentUser.subscribe(
      currentUser => {
        this.currentUser = currentUser;
      }
    );
  }

  ngOnInit() {
    console.log(localStorage);
    this.submitted = false;
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/admin';
    this.adminLoginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.adminLoginForm.invalid) {
      return;
    }
    this.loading = true;
    this.subscription.add(this.authService.login(this.adminLoginForm.value).subscribe(
      () => {
        this.userService.getProfile().subscribe(
          currentUser => {
            let hasRoleAdmin = false;
            const roleList = currentUser.roles;
            for (const role of roleList) {
              if (role.name === 'ROLE_ADMIN') {
                hasRoleAdmin = true;
                break;
              }
            }
            if (hasRoleAdmin) {
              this.error = false;
              this.message = '';
              this.adminLoginAction.emit();
              this.router.navigate(['/admin']);
            } else {
              this.error = true;
              this.authService.logout();
              this.message = 'Your account is not an Administrator account';
            }
            this.submitted = false;
          }
        );
      }, error => {
        this.error = true;
        if (error.statusCode === 400) {
          this.message = 'Wrong username or password';
        } else {
          this.message = 'Oop!!! An error has occurred';
        }
      }, () => {
        this.loading = false;
        console.log(localStorage);
      }
    ));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { PlaceholderDirective } from 'src/app/shared/placeholder/placeholder.directive';
import { AuthResponseData, AuthService } from '../auth.service';
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  //   Dynamic component directive and subscription
  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective;
  private closeSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.store.select('auth').subscribe((authState) => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      if (this.error) {
        // dynamic error alert
        this.showErrorAlert(this.error);
      }
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.error = null;
    const email = form.value.email;
    const password = form.value.password;
    // this.isLoading = true;
    // Since it's almost the same subscribe response, we can use the same method to handle both login and signup
    // let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      //   authObs = this.authService.login(email, password);
      // NGRX:
      this.store.dispatch(
        new AuthActions.LoginStart({ email: email, password: password })
      );
    } else {
      //   authObs = this.authService.signUp(email, password);
      this.store.dispatch(
        new AuthActions.SignupStart({ email: email, password: password })
      );
    }
    // authObs.subscribe(
    //   (resData) => {
    //     console.log(resData);
    //     this.isLoading = false;
    //     this.router.navigate(['/recipes']);
    //   },
    //   (errorMessage) => {
    //     this.error = errorMessage;
    //     // dynamic error alert
    //     // this.showErrorAlert(errorMessage);
    //     this.isLoading = false;
    //   }
    // );

    form.reset();
  }

  //   for the normal ngif alert component
  onHandleError() {
    this.error = null;
  }

  //   dynamic alert component
  private showErrorAlert(message: string) {
    const alertCmpFactory =
      this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }
}

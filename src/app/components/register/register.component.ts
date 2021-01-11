import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';
import { PlannerService } from 'src/app/services/planner.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  categories = ['Music', 'Movies', 'Sport', 'Travel', 'Cooking', 'Art']
  categoriesMap = {}

  constructor(
    private formBuilder: FormBuilder,
    private plannerService: PlannerService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      password: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      myChoices: new FormArray([]),
      question1: ['', [Validators.required]],
      question2: ['', [Validators.required]],
      question3: ['', [Validators.required]],
      question4: ['', [Validators.required]]
    });
  }

  onCheckChange(event) {
    const formArray: FormArray = this.registerForm.get('myChoices') as FormArray;
    if (event.target.checked) {
      formArray.push(new FormControl(event.target.value));
    }
    else {
      let i: number = 0;

      formArray.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value == event.target.value) {
          formArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  ngOnInit(): void { }

  onSubmit(): void {
    this.checkSurvey();

    if (this.registerForm.invalid) {
      this.toastr.error("Enter the data correctly", "Registration failed")
      return;
    }

    const userToSave = new User();
    userToSave.name = this.registerForm.value.name;
    userToSave.surname = this.registerForm.value.surname;
    userToSave.email = this.registerForm.value.email;
    userToSave.password = this.registerForm.value.password;
    userToSave.permission = 'true'; //nie wiem do czego to permission mialo byc
    userToSave.groupid = 1;

    this.plannerService.registerUser(userToSave).subscribe(
      data => console.log(data),
      err => {
        if (err.status == 401) {
          this.toastr.error("The specified user already exists", "Registration failed")
        }
      },
      () => {
        this.toastr.success("Registration was successful", "Registration");
        this.router.navigate(['login']);
      }
    );
  }
  checkSurvey(): void {
    const categories = ['art', 'auto', 'books', 'charity', 'community', 'cooking', 'family', 'fashion', 'games', 'health', 'holiday', 'housework', 'meeting', 'movies', 'music', 'sport', 'travel']
    categories.forEach(cat => {
      this.categoriesMap[cat] = 1;
    })
    this.addPoints(this.registerForm.value.myChoices, 2);

    if (this.registerForm.value.question1 == 'Passievely') this.addPoints(['books', 'games', 'movies', 'music', 'cooking'], 1)
    else this.addPoints(['community', 'cooking', 'health', 'meeting', 'sport', 'travel', 'holiday', 'family', 'auto'], 1)

    if (this.registerForm.value.question2 == 'Books') this.addPoints(['books', 'movies', 'music', 'cooking', 'charity', 'art', 'fashion', 'housework', 'health'], 1)
    else this.addPoints(['games', 'auto', 'community', 'family', 'holiday', 'travel'], 1)

    if (this.registerForm.value.question3 == 'Education') this.addPoints(['books', 'movies', 'music', 'charity', 'art', 'fashion'], 3)
    else if (this.registerForm.value.question3 == 'Health') this.addPoints(['sport', 'health', 'charity', 'community', 'travel', 'holiday'], 3)
    else this.addPoints(['cooking', 'family', 'housework', 'auto'], 3)

    if (this.registerForm.value.question4 == 'Yes') this.addPoints(['travel', 'community', 'books', 'holiday', 'family'], 1)
    else this.addPoints(['movies', 'games', 'housework', 'auto'], 1)

    console.log(this.categoriesMap)

  }
  addPoints(categories, point): void {
    categories.forEach(cat => {
      this.categoriesMap[cat.toLowerCase()] += point;
    });
  }
}

import ApiService from '@/core/services/ApiService';
import { Actions, Mutations } from '@/store/enums/StoreEnums';
import { Module, Action, Mutation, VuexModule } from 'vuex-module-decorators';

export interface User {
  name: string;
  email: string;
  password: string;
}

export interface UserAuthInfo {
  errors: unknown;
  user: User;
  isAuthenticated: boolean;
}

@Module
export default class AuthModule extends VuexModule implements UserAuthInfo {
  errors = {};
  user = {} as User;
  isAuthenticated = false;

  /**
   * Get current user object
   * @returns User
   */
  get currentUser(): User {
    return this.user;
  }

  /**
   * Verify user authentication
   * @returns boolean
   */
  get isUserAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  /**
   * Get authentification errors
   * @returns array
   */
  get getErrors() {
    return this.errors;
  }

  @Mutation
  [Mutations.SET_ERROR](error) {
    this.errors = { ...error };
  }

  @Mutation
  [Mutations.SET_AUTH](user) {
    this.isAuthenticated = true;
    this.user = user;
    this.errors = {};
  }

  @Mutation
  [Mutations.SET_USER](user) {
    this.user = user;
  }

  @Mutation
  [Mutations.SET_PASSWORD](password) {
    this.user.password = password;
  }

  @Mutation
  [Mutations.PURGE_AUTH]() {
    this.isAuthenticated = false;
    this.user = {} as User;
    this.errors = [];
  }

  @Action
  async [Actions.LOGIN](credentials) {
    await ApiService.get('csrf-cookie').then(async () => {
      return ApiService.post('login', credentials)
        .then(() => {
          this.context.dispatch(Actions.VERIFY_AUTH);
        })
        .catch(({ response }) => {
          this.context.commit(Mutations.SET_ERROR, response.data.errors);
        });
    });
  }

  @Action
  [Actions.LOGOUT]() {
    return ApiService.post('logout', {})
      .then(() => {
        this.context.commit(Mutations.PURGE_AUTH);
      })
      .catch(({ response }) => {
        this.context.commit(Mutations.SET_ERROR, response.data.errors);
      });
  }

  @Action
  async [Actions.REGISTER](credentials) {
    await ApiService.get('csrf-cookie').then(async () => {
      return ApiService.post('register', credentials)
        .then(({ data }) => {
          console.log(data);
          this.context.commit(Mutations.SET_AUTH, data);
        })
        .catch(({ response }) => {
          this.context.commit(Mutations.SET_ERROR, response.data.errors);
        });
    });
  }

  @Action
  [Actions.FORGOT_PASSWORD](payload) {
    return ApiService.post('forgot_password', payload)
      .then(() => {
        this.context.commit(Mutations.SET_ERROR, {});
      })
      .catch(({ response }) => {
        this.context.commit(Mutations.SET_ERROR, response.data.errors);
      });
  }

  @Action
  async [Actions.VERIFY_AUTH]() {
    await ApiService.query('me', {})
      .then(({ data }) => {
        this.context.commit(Mutations.SET_AUTH, data);
      })
      .catch(({ response }) => {
        this.context.commit(Mutations.SET_ERROR, response.data.errors);
        return this.context.commit(Mutations.PURGE_AUTH);
      });
  }
}

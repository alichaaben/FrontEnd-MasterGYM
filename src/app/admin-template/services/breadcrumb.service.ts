import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';

export interface Breadcrumb {
  label: string;
  url: string;
}

@Injectable({ providedIn: 'root' })
export class BreadcrumbService {
  breadcrumbs$ = new BehaviorSubject<Breadcrumb[]>([]);

  constructor(private router: Router) {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
      const root = this.router.routerState.snapshot.root;
      const breadcrumbs: Breadcrumb[] = [];
      this.addBreadcrumb(root, '', breadcrumbs);
      this.breadcrumbs$.next(breadcrumbs);
    });
  }

  private addBreadcrumb(route: ActivatedRouteSnapshot, url: string, breadcrumbs: Breadcrumb[]) {
    const label = route.data['breadcrumb'];
    const path = route.routeConfig?.path;

    if (label && path) {
      const fullUrl = `${url}/${path.split('/:')[0]}`;
      breadcrumbs.push({ label, url: fullUrl });
    }

    if (route.firstChild) {
      this.addBreadcrumb(route.firstChild, url + '/' + route.url.map(x => x.path).join('/'), breadcrumbs);
    }
  }
}

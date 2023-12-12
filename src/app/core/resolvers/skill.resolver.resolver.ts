import { ResolveFn } from '@angular/router';
import { Skill } from '../models/skill.model';
import { inject } from '@angular/core';
import { SkillServiceService } from '../services/skill.service.service';

export const skillResolverResolver: ResolveFn<Skill> = (route, state) => {
  return inject(SkillServiceService).getSkillById(Number(route.paramMap.get('id'))!)
};

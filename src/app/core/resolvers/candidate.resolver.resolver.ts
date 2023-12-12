import { ResolveFn } from '@angular/router';
import { Candidate } from '../models/candidate.model';
import { inject } from '@angular/core';
import { CandidateServiceService } from '../services/candidate.service.service';

export const candidateResolverResolver: ResolveFn<Candidate> = (route, state) => {
  return inject(CandidateServiceService).getCandidateById(Number(route.paramMap.get('id'))!)
};

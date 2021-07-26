import { Resolver } from '@nestjs/graphql';
import EmployeeService from './employee.service';

@Resolver()
export default class EmployeeResolver {
  constructor(private _employeeService: EmployeeService) {}
}

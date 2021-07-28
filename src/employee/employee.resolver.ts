import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import EmployeeCreateInput from './type/employee-create.input.type';
import EmployeeService from './employee.service';
import Employee from './entity/employee.entity';
import Attendees from './type/attendees.type';

@Resolver(() => Employee)
export default class EmployeeResolver {
  constructor(
    private _employeeService: EmployeeService,
    @InjectPinoLogger() private _logger: PinoLogger,
  ) {}

  @Query(() => [Employee], { name: 'getAllEmployees' })
  async findAll() {
    this._logger.trace('find all request received');
    const employees: Employee[] = await this._employeeService.findAll();
    this._logger.trace(`employee record(s) ${employees.length} returned`);
    return employees;
  }

  @Mutation(() => Employee, { name: 'createEmployee' })
  create(@Args('employeeInput') employee: EmployeeCreateInput) {
    return this._employeeService.create(employee);
  }

  @Query(() => Employee)
  findOne(@Args('id') id: string) {
    return this._employeeService.findOne(id);
  }

  @Query(() => [Attendees])
  // eslint-disable-next-line class-methods-use-this
  findAllAttendeesDataSource(@Context('dataSources') { webinar }) {
    const attendees = webinar.getAttendees();
    return attendees;
  }

  @Query(() => [Attendees])
  async findAllAttendeesHttp() {
    const e = await this._employeeService.findAllAttendeesHttp();
    return e;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import EmployeeCreateInput from './type/employee-create.input.type';
import Employee from './entity/employee.entity';
import WebinarApi from './webinar-api.service';
import HttpClientService from 'src/util/http-client.service';

@Injectable()
export default class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private _employeeRepository: Repository<Employee>,
    private _webinarApi: WebinarApi,
    private _httpClient: HttpClientService,
  ) {}

  async findAllAttendees() {
    const attendees = await this._webinarApi.getAttendees();
    return attendees;
  }

  async findAllAttendeesHttp() {
    const attendees = await this._httpClient.get(
      'https://demo4689628.mockable.io/employees',
      10,
    );
    return attendees;
  }

  async findAll(): Promise<Employee[]> {
    const employees: Employee[] = await this._employeeRepository.find();
    return employees;
  }

  async findOne(id: string) {
    return this._employeeRepository.findOne(id);
  }

  async create(employee: EmployeeCreateInput): Promise<Employee> {
    const emp = this._employeeRepository.create(employee);
    return this._employeeRepository.save(emp);
  }

  async forProject(id: string) {
    const employees: Employee[] = await this._employeeRepository.find({
      projectId: id,
    });
    return employees;
  }

  async forLocation(id: string) {
    const employees: Employee[] = await this._employeeRepository.find({
      locationId: id,
    });
    return employees;
  }
}

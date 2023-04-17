import { Exceptions } from '../exceptions/exception';
import { ExceptionType } from '../exceptions/exceptions-protocols';

export class SearchMethods {
  constructor(
    private readonly value: string | string[],
    private readonly repository: any,
  ) {}

  async getByUser(): Promise<any> {
    const user = await this.repository.getByUser(this.value);
    if (!user) {
      throw new Exceptions(
        ExceptionType.NotFundexception,
        'usuário não encontrado',
      );
    }
    return user;
  }

  async getBySchedule(): Promise<any> {
    const scheduleCreated = await this.repository.getBySchedule(this.value);
    if (scheduleCreated) {
      throw new Exceptions(
        ExceptionType.NotFundexception,
        'o agendamento já foi realizado',
      );
    }
    return scheduleCreated;
  }

  async getByAddress(): Promise<any> {
    const address = await this.repository.getByAddress(this.value);
    if (!address) {
      throw new Exceptions(
        ExceptionType.NotFundexception,
        'Endereço não encontrado',
      );
    }
    return address;
  }

  async getByServices(dto): Promise<any> {
    const services = await this.repository.getByService(this.value);
    if (!services) {
      throw new Exceptions(
        ExceptionType.NotFundexception,
        'Esse estabelecimento não ofereçe esse tipo de serviço',
      );
    }
    const filteredServices = services.filter((service) =>
      dto.serviceName.some((name) => name === service.serviceName),
    );
    if (filteredServices.length === 0) {
      throw new Exceptions(
        ExceptionType.NotFundexception,
        'Nenhum serviço encontrado',
      );
    }
    return filteredServices;
  }

  async getByCalendar(dto): Promise<any> {
    console.log('dto', dto);
    const calendar = await this.repository.getByCalendar(this.value);
    if (!calendar) {
      throw new Exceptions(
        ExceptionType.NotFundexception,
        'Calendario não encontrado',
      );
    }
    for (const day of dto.day) {
      if (!calendar.day.includes(day)) {
        throw new Exceptions(
          ExceptionType.NotFundexception,
          'data indisponíveis',
        );
      }
    }

    for (const time of dto.startTime) {
      if (!calendar.startTime.includes(time)) {
        throw new Exceptions(
          ExceptionType.NotFundexception,
          'horario indisponível',
        );
      }
    }
  }

  async getByRelatedServices(dto): Promise<any> {
    const services = await this.repository.getByRelatedServices(this.value);
    if (!services) {
      throw new Exceptions(
        ExceptionType.NotFundexception,
        'Esse estabelecimento não ofereçe esse tipo de serviço',
      );
    }
    const filteredServices = services.filter((service) =>
      dto.serviceName.some((name) => name === service.serviceName),
    );
    if (filteredServices.length === 0) {
      throw new Exceptions(
        ExceptionType.NotFundexception,
        'Nenhum serviço encontrado',
      );
    }
    return filteredServices;
  }

  async getByRelatedAddress(dto): Promise<any> {
    const calendar = await this.repository.getByRelatedAddress(this.value);
    if (!calendar) {
      throw new Exceptions(
        ExceptionType.NotFundexception,
        'Calendario não encontrado',
      );
    }
    if (dto.day) {
      dto.day.map((day) => {
        if (!calendar.day.includes(day)) {
          throw new Exceptions(
            ExceptionType.NotFundexception,
            'data indisponível',
          );
        }
        return Array.isArray(day) ? day : [day];
      });
    }
    if (dto.startTime) {
      dto.startTime.map((time) => {
        if (!calendar.startTime.includes(time)) {
          throw new Exceptions(
            ExceptionType.NotFundexception,
            'horario indisponível',
          );
        }
        return Array.isArray(time) ? time : [time];
      });
    }
  }
}

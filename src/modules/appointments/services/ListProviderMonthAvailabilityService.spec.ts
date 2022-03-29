import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';

import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;

let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

const provider_id = 'any-provider-id';
const user_id = 'any-customer-id';

const month = 4;
const year = 2020;

describe('ListProviderMonthAvailability', () => {
  beforeEach(async () => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );

    await fakeAppointmentsRepository.create({
      provider_id,
      user_id,
      date: new Date(year, month - 1, 21, 12, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id,
      user_id,
      date: new Date(year, month - 1, 21, 17, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id,
      user_id,
      date: new Date(year, month - 1, 22, 8, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id,
      user_id,
      date: new Date(year, month - 1, 22, 9, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id,
      user_id,
      date: new Date(year, month - 1, 22, 10, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id,
      user_id,
      date: new Date(year, month - 1, 22, 11, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id,
      user_id,
      date: new Date(year, month - 1, 22, 12, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id,
      user_id,
      date: new Date(year, month - 1, 22, 13, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id,
      user_id,
      date: new Date(year, month - 1, 22, 14, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id,
      user_id,
      date: new Date(year, month - 1, 22, 15, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id,
      user_id,
      date: new Date(year, month - 1, 22, 16, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id,
      user_id,
      date: new Date(year, month - 1, 22, 17, 0, 0),
    });
  });

  it("should be able to list the provider's month availability", async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(year, month - 1, 21, 8).getTime());

    const availability = await listProviderMonthAvailability.execute({
      provider_id,
      month,
      year,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 20, available: false },
        { day: 21, available: true },
        { day: 22, available: false },
        { day: 23, available: true },
      ]),
    );
  });
});

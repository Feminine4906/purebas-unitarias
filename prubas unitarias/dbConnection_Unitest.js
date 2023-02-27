const mongoose = require('mongoose');
const connectDB = require('./connectDB');

describe('Database Connection', () => {
  beforeAll(async () => {
    // connect to test database
    await mongoose.connect('mongodb://localhost/test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
  });

  afterAll(async () => {
    // disconnect from test database
    await mongoose.connection.close();
  });

  it('should connect to the database', async () => {
    const logSpy = jest.spyOn(console, 'log');
    await connectDB();
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('MongoDB connected'));
    logSpy.mockRestore();
  });

  it('should throw an error if it fails to connect to the database', async () => {
    const error = new Error('Could not connect to database');
    mongoose.connect = jest.fn(() => {
      throw error;
    });
    const exitSpy = jest.spyOn(process, 'exit').mockImplementation(() => {});
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    await connectDB();
    expect(exitSpy).toHaveBeenCalledWith(1);
    expect(consoleSpy).toHaveBeenCalledWith(error);
    exitSpy.mockRestore();
    consoleSpy.mockRestore();
  });
});

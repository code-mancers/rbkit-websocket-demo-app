begin
  require 'rbkit'
  #Rbkit.start_profiling(pub_port: 9999, request_port: 9998, enable_object_trace: false, enable_gc_stats: false, cpu_sampling_interval_usec: 20000, clock_type: :wall)
  Rbkit.start_server(pub_port: 9999, request_port: 9998)
rescue LoadError
  Rails.logger.warn 'Rbkit cannot be loaded'
end

-- Additional Database Functions
-- Created: 2025-11-22

-- Function to decrement available seats for a class schedule
CREATE OR REPLACE FUNCTION decrement_available_seats(schedule_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE class_schedules
  SET available_seats = GREATEST(available_seats - 1, 0)
  WHERE id = schedule_id;

  -- If seats are 0, mark as unavailable
  UPDATE class_schedules
  SET is_available = FALSE
  WHERE id = schedule_id AND available_seats = 0;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment available seats (for order cancellation)
CREATE OR REPLACE FUNCTION increment_available_seats(schedule_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE class_schedules
  SET available_seats = available_seats + 1,
      is_available = TRUE
  WHERE id = schedule_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to handle order cancellation
CREATE OR REPLACE FUNCTION handle_order_cancellation()
RETURNS TRIGGER AS $$
BEGIN
  -- If order status changes to 'cancelled', increment available seats
  IF NEW.status = 'cancelled' AND OLD.status != 'cancelled' AND NEW.schedule_id IS NOT NULL THEN
    PERFORM increment_available_seats(NEW.schedule_id);
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_order_status_change
  AFTER UPDATE OF status ON orders
  FOR EACH ROW
  EXECUTE FUNCTION handle_order_cancellation();

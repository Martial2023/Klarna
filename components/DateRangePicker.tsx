"use client";

import { CalendarIcon } from "lucide-react";
import { useCallback, useMemo } from "react";
import {
  Button,
  DateRangePicker,
  Dialog,
  Group,
  Popover,
} from "react-aria-components";
import type {
  CalendarDate,
  CalendarDateTime,
  DateValue,
  ZonedDateTime,
} from "@internationalized/date";
import { fromDate, getLocalTimeZone } from "@internationalized/date";
import type { RangeValue } from "@react-types/shared";

import { cn } from "@/lib/utils";
import { RangeCalendar } from "@/components/ui/calendar-rac";
import { DateInput, dateInputStyle } from "@/components/ui/datefield-rac";

type Props = {
  startDate: Date | null;
  setStartDate: (date: Date | null) => void;
  endDate: Date | null;
  setEndDate: (date: Date | null) => void;
};

const timeZone = getLocalTimeZone();

const toDateValue = (date: Date | null): DateValue | null => {
  return date ? fromDate(date, timeZone) : null;
};

const toNativeDate = (
  value: DateValue | null | undefined,
): Date | null => {
  if (!value) {
    return null;
  }

  if ("timeZone" in value) {
    return (value as ZonedDateTime).toDate();
  }

  return (value as CalendarDate | CalendarDateTime).toDate(timeZone);
};

export default function DateRangePickerComponent({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: Props) {
  const selectedRange = useMemo<RangeValue<DateValue | null>>(
    () => ({
      start: toDateValue(startDate),
      end: toDateValue(endDate),
    }),
    [startDate, endDate],
  );

  const handleChange = useCallback(
    (range: RangeValue<DateValue> | null) => {
      setStartDate(range ? toNativeDate(range.start) : null);
      setEndDate(range ? toNativeDate(range.end) : null);
    },
    [setStartDate, setEndDate],
  );

  return (
    <DateRangePicker
      className="*:not-first:mt-2"
      value={selectedRange}
      onChange={handleChange}
    >
      <div className="flex">
        <Group className={cn(dateInputStyle, "pe-9")}>
          <DateInput slot="start" unstyled />
          <span aria-hidden="true" className="px-2 text-muted-foreground/70">
            -
          </span>
          <DateInput slot="end" unstyled />
        </Group>
        <Button className="-ms-9 -me-px z-10 flex w-9 items-center justify-center rounded-e-md text-muted-foreground/80 outline-none transition-[color,box-shadow] hover:text-foreground data-focus-visible:border-ring data-focus-visible:ring-[3px] data-focus-visible:ring-ring/50">
          <CalendarIcon size={16} />
        </Button>
      </div>
      <Popover
        className="data-[entering]:fade-in-0 data-[entering]:zoom-in-95 data-[exiting]:fade-out-0 data-[exiting]:zoom-out-95 data-[placement=bottom]:slide-in-from-top-2 data-[placement=left]:slide-in-from-right-2 data-[placement=right]:slide-in-from-left-2 data-[placement=top]:slide-in-from-bottom-2 z-50 rounded-md border bg-background text-popover-foreground shadow-lg outline-hidden data-entering:animate-in data-exiting:animate-out"
        offset={4}
      >
        <Dialog className="max-h-[inherit] overflow-auto p-2">
          <RangeCalendar />
        </Dialog>
      </Popover>
    </DateRangePicker>
  );
}